import React, { useEffect, useRef, useState, useCallback } from 'react';

const TOTAL_FRAMES = 235;
const SAMPLE_COUNT = 60;
const STEP = (TOTAL_FRAMES - 1) / (SAMPLE_COUNT - 1);

const pad = (num) => String(num).padStart(3, '0');
const getFrameUrl = (index) => `/images/frames/ezgif-frame-${pad(index)}.png`;

const PortraitCanvas = ({
  scrollProgress = 0,
  className = "",
  initialFitMode = 'contain',
  scale = 0.88,
  verticalFocus = 0.5,
  horizontalFocus = 0.5,
  customOffsetX = 0,
  customOffsetY = 0
}) => {
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [canvasReady, setCanvasReady] = useState(false);
  const lastDrawnImage = useRef(null);

  const drawToCanvas = useCallback((img) => {
    const canvas = canvasRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    const cw = rect.width || canvas.parentElement?.clientWidth || 400;
    const ch = rect.height || canvas.parentElement?.clientHeight || 600;

    const targetWidth = Math.round(cw * dpr);
    const targetHeight = Math.round(ch * dpr);

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, cw, ch);

    const imgRatio = (img.width || 405) / (img.height || 720);
    const canvasRatio = cw / ch;

    let renderW, renderH, offsetX, offsetY;

    if (initialFitMode === 'contain') {
      if (canvasRatio > imgRatio) {
        renderW = cw * scale;
        renderH = (cw / imgRatio) * scale;
        offsetX = (cw - renderW) * horizontalFocus + customOffsetX;
        offsetY = (ch - renderH) * verticalFocus + customOffsetY;
      } else {
        renderH = ch * scale;
        renderW = (ch * imgRatio) * scale;
        offsetX = (cw - renderW) * horizontalFocus + customOffsetX;
        offsetY = (ch - renderH) * verticalFocus + customOffsetY;
      }
    } else {
      if (canvasRatio > imgRatio) {
        renderH = ch * scale;
        renderW = (ch * imgRatio) * scale;
        offsetX = (cw - renderW) * horizontalFocus + customOffsetX;
        offsetY = (ch - renderH) * verticalFocus + customOffsetY;
      } else {
        renderW = cw * scale;
        renderH = (cw / imgRatio) * scale;
        offsetX = (cw - renderW) * horizontalFocus + customOffsetX;
        offsetY = (ch - renderH) * verticalFocus + customOffsetY;
      }
    }

    try {
      ctx.drawImage(img, offsetX, offsetY, renderW, renderH);
      setCanvasReady(true);
    } catch (e) {
    }

    ctx.restore();
  }, [initialFitMode, scale, verticalFocus, horizontalFocus, customOffsetX, customOffsetY]);

  useEffect(() => {
    let isMounted = true;
    const loadedImages = new Array(SAMPLE_COUNT);
    let count = 0;

    const indices = [];
    for (let i = 0; i < SAMPLE_COUNT; i++) {
      const frameNum = Math.min(TOTAL_FRAMES, Math.max(1, Math.round(1 + i * STEP)));
      indices.push({ arrayIdx: i, frameNum });
    }

    indices.forEach(({ arrayIdx, frameNum }) => {
      const img = new Image();
      img.src = getFrameUrl(frameNum);
      img.onload = () => {
        if (!isMounted) return;
        loadedImages[arrayIdx] = img;
        count += 1;
        setLoadedCount(count);

        if (arrayIdx === 0) {
          lastDrawnImage.current = img;
          drawToCanvas(img);
        }
      };
    });

    imagesRef.current = loadedImages;

    return () => {
      isMounted = false;
    };
  }, [drawToCanvas]);

  useEffect(() => {
    const handleResize = () => {
      if (lastDrawnImage.current) {
        drawToCanvas(lastDrawnImage.current);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [drawToCanvas]);

  useEffect(() => {
    const images = imagesRef.current;
    if (!images || images.length === 0) return;

    const clamped = Math.max(0, Math.min(1, scrollProgress));
    const targetIndex = Math.min(
      SAMPLE_COUNT - 1,
      Math.floor(clamped * (SAMPLE_COUNT - 1))
    );

    let img = images[targetIndex];
    if (!img) {
      for (let offset = 1; offset < SAMPLE_COUNT; offset++) {
        if (targetIndex - offset >= 0 && images[targetIndex - offset]) {
          img = images[targetIndex - offset];
          break;
        }
        if (targetIndex + offset < SAMPLE_COUNT && images[targetIndex + offset]) {
          img = images[targetIndex + offset];
          break;
        }
      }
    }

    if (img) {
      lastDrawnImage.current = img;
      drawToCanvas(img);
    }
  }, [scrollProgress, loadedCount, drawToCanvas]);

  return (
    <div className={`relative w-full h-full flex items-center justify-center overflow-hidden ${className}`}>
      <img
        src="/images/portrait.png"
        alt="Sridhar M — Python Full Stack Developer"
        className={`w-full h-full object-contain transition-opacity duration-300 ${canvasReady ? 'opacity-0 absolute inset-0 pointer-events-none' : 'opacity-100'
          }`}
      />

      <canvas
        ref={canvasRef}
        className={`w-full h-full object-contain transition-opacity duration-300 ${canvasReady ? 'opacity-100' : 'opacity-0'
          }`}
      />
    </div>
  );
};

export default PortraitCanvas;
