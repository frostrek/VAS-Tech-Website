# SPEC

## §G GOAL
VAS Tech website — enterprise AI showcase. Interactive demos demonstrate product capabilities. All demos ! behave correctly on all input devices.

## §C CONSTRAINTS
- Stack: React + TypeScript + Vite + Tailwind CSS + Framer Motion
- No backend mutations from frontend demo components
- All demos ! work on desktop (mouse + touchpad) & mobile (touch)
- Build ! stay error-free after every change
- 3D features: Use `@react-three/fiber` & `@react-three/drei`

## §I INTERFACES
- web: `/experience` → ExperiencePage.tsx → demo components
- demo: EmailAutomationDemo → `src/components/demos/EmailAutomationDemo.tsx`
- demo: InvoiceAIOcrDemo → `src/components/demos/InvoiceAIOcrDemo.tsx`
- demo: WhatsappBotDemo → `src/components/demos/WhatsappBotDemo.tsx`
- demo: LinkedinOutreachDemo → `src/components/demos/LinkedinOutreachDemo.tsx`
- viz: 3D Splash Screen → `src/components/experience/ExperienceSplashScreen.tsx`

## §V INVARIANTS
V1: ∀ demo box with `overflow-y-auto` ! also have `overscroll-contain` → wheel/touchpad scroll ⊥ bubble to page
V2: ∀ scrollable inner container ! trap scroll events at own boundary (overscroll-behavior: contain)

## §T TASKS
id|status|task|cites
T1|x|fix email automation demo scroll bubble on touchpad|V1,V2
T2|x|fix invoice OCR JSON panel scroll bubble on touchpad|V1,V2
T3|x|impl `ExperienceSplashScreen` with immersive 3D fiber & framer animation|-
T4|x|integrate splash screen into `ExperiencePage.tsx` initial load|I.web

## §B BUGS
id|date|cause|fix
B1|2026-04-21|`EmailAutomationDemo` `.overflow-y-auto` div ∉ `overscroll-contain` → touchpad swipe scrolls page not box|V1
B2|2026-04-21|`InvoiceAIOcrDemo` JSON panel `.overflow-y-auto` div ∉ `overscroll-contain` → same bubble|V1
