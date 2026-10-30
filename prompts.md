Act as a senior frontend developer, UI/UX designer, and GSAP animation specialist. Build a complete, premium, cinematic personal portfolio website for **Sridhar M — Python Full Stack Developer** using React, Vite, Tailwind CSS, HTML5, CSS3, JavaScript, GSAP, and GSAP ScrollTrigger.

Create a fully functional, responsive website with smooth scroll animations, interactive elements, modern typography, and a professional dark theme. Do not create only a static design.

## Design and Theme
- Dark cinematic background: black, deep navy, and charcoal.
- Electric-blue accents, subtle neon glow, soft gradients, and floating particles.
- Premium typography, clean layouts, spacious sections, and modern cards.
- Smooth transitions and elegant hover effects.
- Responsive design for desktop, tablet, and mobile.
- Avoid excessive effects, clutter, and unnecessary dependencies.

## 1. Navigation
Create a responsive sticky navbar with the logo `SRIDHAR.DEV` and links:
- Home
- About
- Projects
- Resume
- Contact

Add smooth scrolling, active-section highlighting, a transparent initial navbar, a blurred background on scroll, and an animated mobile menu.

## 2. Home / Hero Section
Create a full-screen hero section with my uploaded professional portrait.

Display:
- `HELLO, WORLD!`
- `Hi, I'm Sridhar`
- `Python Full Stack Developer`
- `I build modern, responsive web applications with clean code, thoughtful design, and practical problem-solving.`
- `View Projects` button
- `Contact Me` button
- GitHub, LinkedIn, and email icons.

Animate the heading with staggered text reveals, the description with fade-up effects, the buttons with smooth entrance animations, and the portrait with a subtle scale and floating effect.

Use the uploaded portrait as the actual image. Preserve my face and identity. Add a soft electric-blue glow behind the portrait.

Implement a cinematic GSAP ScrollTrigger animation: as the user scrolls, smoothly enlarge the portrait slightly and move it toward the left while the introduction text appears on the right. Pin the hero section for a controlled scroll sequence and release it smoothly into the About section.

Add subtle mouse-based parallax on desktop and disable complex interactions on touch devices.

## 3. About Section
Heading: `About Me`

Description: Introduce me as a Python Full Stack Developer passionate about building useful, responsive, and visually engaging web applications.

Include:
- B.Com degree completed in 2025.
- Python Full Stack Developer training at Livewire Salem.
- Relevant professional experience.
- Career interest in frontend and full-stack development.

Display animated skill badges for:
Python, Django, Django REST Framework, React, JavaScript, HTML5, CSS3, Tailwind CSS, Bootstrap, MySQL, Git, and GitHub.

Add four animated highlight cards:
- Frontend Development
- Backend Development
- Database Management
- Continuous Learning

Use scroll-triggered heading reveals, staggered skill animations, and card entrance effects. Do not invent qualifications or skill percentages.

## 5. Resume Section
Heading: `My Resume`

Description: `Explore my education, skills, projects, training, and professional experience.`

Include:
- View Resume button.
- Download Resume button.
- Optional embedded PDF preview.

Use `public/resume.pdf` as the configurable résumé path. If the file is missing, show a clear setup message instead of a broken link.

## 6. Contact Section
Heading: `Let's Work Together`

Description: `Have a project or opportunity in mind? Let's connect.`

Create a two-column layout with contact information and a functional form.

Contact details:
- Email
- GitHub
- LinkedIn
- Tamil Nadu, India

Use configurable values and do not invent personal contact information.

Form fields:
- Name
- Email
- Subject
- Message
- Send Message button

Implement validation, loading state, success message, error handling, and duplicate-submission prevention. Use EmailJS or a configurable secure backend endpoint. Never expose private API keys. If email integration is not configured, clearly explain how to configure it instead of pretending a message was sent.

Animate the section heading, form fields, and submit button with GSAP.

## 7. GSAP and ScrollTrigger
GSAP animation is a core feature of this portfolio.

Implement:
- Hero text reveal timeline.
- Portrait entrance and floating animation.
- Portrait left-shift scroll transition.
- Pinned hero sequence on desktop.
- About section reveal.
- Staggered skill badges.
- Project card animations.
- Resume section reveal.
- Contact form animations.
- Subtle background parallax.
- Smooth hover interactions.

Use `gsap.context()` or the appropriate GSAP React integration for scoped animations and cleanup. Register ScrollTrigger correctly. Prevent duplicate animations and triggers during React hot reload. Refresh ScrollTrigger when necessary after images and fonts load.

Prefer transforms and opacity for performance. Respect `prefers-reduced-motion`, simplify pinned animations on mobile, and ensure scrolling never becomes trapped.

## 8. Technical Architecture
Use React with Vite and JavaScript JSX. Use Tailwind CSS for styling and responsive layouts.

Organize the project cleanly:

src/
  assets/
  components/
    Navbar.jsx
    Footer.jsx
    ProjectCard.jsx
    SectionHeading.jsx
    SkillBadge.jsx
    SocialLinks.jsx
  sections/
    Hero.jsx
    About.jsx
    Projects.jsx
    Resume.jsx
    Contact.jsx
  hooks/
    useGsap.js
  data/
    portfolio.js
    projects.js
    skills.js
  App.jsx
  main.jsx
  index.css

public/
  images/
  resume.pdf

Adapt this structure to the existing project if appropriate. Do not overwrite useful existing files unnecessarily.

## 9. Responsive Design and Accessibility
- Support desktop, laptop, tablet, and mobile.
- Prevent horizontal overflow.
- Use responsive typography and spacing.
- Stack hero content vertically on mobile.
- Keep navigation and forms usable on touchscreens.
- Provide semantic HTML, accessible labels, descriptive image alt text, keyboard navigation, visible focus states, and adequate color contrast.
- Optimize images and animations for performance.
- Include an appropriate page title and meta description.

## 10. Execution and Testing
First inspect the existing project directory and dependencies. Configure Vite and Tailwind CSS correctly. Install the necessary packages, implement all sections, and connect all buttons, navigation links, and form states.

Run the production build using `npm run build`, fix all build errors and broken imports, and verify that the application runs with `npm run dev`.

Do not stop after generating the design. Implement the complete website and test the functionality.

**Final goal:** Deliver a polished, cinematic developer portfolio that showcases my actual projects and skills, uses my uploaded portrait, features a stunning GSAP ScrollTrigger hero transition, and helps recruiters discover my profile and contact me for Python Full Stack Developer and Frontend Developer opportunities.