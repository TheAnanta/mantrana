import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

// Hero Section Component
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center">
      {/* <div className="absolute inset-0 bg-[url('/images/hero-bg.png')] bg-cover"></div> */}
      <div className="absolute inset-0 bg-[url('/images/diwali-backdrop-d.png')] bg-cover"></div>
      <div className="absolute -z-10 inset-0 bg-[var(--teal)] bg-cover"></div>

      <div className="relative container-custom text-center">
        <div className="max-w-4xl mx-auto lg:translate-x-4">
          <div className="flex-shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.2"
              viewBox="0 0 434 523"
              className={`size-40 mx-auto`}
              style={{
                fill: "white",
              }}
            >
              <g id="Layer 1">
                <path
                  id="Path 0"
                  fill-rule="evenodd"
                  className="s0"
                  d="m216.75 0.01c0.14 0 1.26 0.52 2.5 1.16 1.24 0.64 3.67 2.56 5.41 4.25 1.74 1.69 5.51 5.78 8.38 9.08 2.87 3.3 8.83 11.4 13.25 18 4.42 6.6 10.6 16.95 13.73 23 3.14 6.05 6.44 13.36 7.34 16.25 0.9 2.89 2.2 5.52 2.89 5.86 0.69 0.33 3.73-0.74 6.75-2.38 3.02-1.64 9.1-4.37 13.5-6.05 4.4-1.69 12.5-4.44 18-6.1 5.5-1.66 14.16-3.71 19.25-4.55 7.51-1.24 9.73-1.3 11.78-0.28 1.68 0.82 3.02 2.78 3.97 5.75 0.78 2.47 2.33 9 3.43 14.5 1.1 5.5 2.51 15.4 3.13 22 0.62 6.71 0.82 16.19 0.44 21.5-0.38 5.22-1.53 14.22-2.55 20-1.03 5.78-2.56 13.2-4.94 22.5l2.75 2.27c1.51 1.24 3.86 2.87 5.24 3.61 1.37 0.74 4.64 3.77 7.25 6.73 2.62 2.97 6.08 7.86 7.7 10.89 1.61 3.03 3.68 8.65 4.59 12.5 1.22 5.16 1.53 9.89 1.19 18-0.35 8.28-1.04 12.48-2.78 17-1.28 3.3-3.86 8.47-5.74 11.5-1.89 3.03-4.61 6.78-6.07 8.36-1.45 1.57-5.34 4.69-8.64 6.93-3.3 2.25-8.25 5.1-11 6.35-2.75 1.25-9.27 2.97-14.5 3.81-5.23 0.85-11.98 1.54-15 1.54-3.02 0.01-9.1-0.66-13.5-1.47-4.4-0.81-9.69-1.94-11.75-2.5-2.06-0.56-5.21-1.39-7-1.85-1.79-0.45-7.52-2.84-12.75-5.3-5.23-2.47-12.88-6.65-17-9.31-4.13-2.66-10.19-6.91-13.48-9.45-3.29-2.53-7.69-6.18-13.58-11.61l4.78-4.77c2.63-2.63 5.57-4.99 6.53-5.25 1.1-0.3 4.43 1.64 8.99 5.27 3.99 3.16 8.6 6.66 10.25 7.78 1.66 1.11 5.26 3.34 8.01 4.94 2.75 1.6 8.49 4.63 12.75 6.72 4.26 2.1 9.44 4.24 11.5 4.77 2.06 0.52 6.45 1.64 9.75 2.48 3.4 0.87 10.34 1.53 16 1.54 6.96 0 11.82-0.56 16-1.86 3.3-1.02 7.95-2.93 10.34-4.24 2.39-1.31 6.24-4.18 8.54-6.38 2.31-2.2 5.73-7.15 7.61-11 3.13-6.43 3.41-7.78 3.46-16.5 0.04-6.89-0.48-11.01-1.87-15-1.05-3.03-3.22-7.3-4.81-9.5-1.59-2.2-4.77-5.49-7.08-7.31-2.3-1.81-5.99-4.18-8.19-5.25-2.2-1.08-7.6-2.61-12-3.41-4.4-0.8-9.57-1.48-11.5-1.51-1.93-0.02-7.55 0.67-12.5 1.53-4.95 0.86-13.5 3.33-19 5.49-5.5 2.15-12.7 5.6-16 7.66-3.3 2.06-9.15 6.16-13 9.11-3.85 2.96-14.6 12.19-23.89 20.53-9.29 8.34-21.52 18.76-27.16 23.16-5.65 4.4-14.92 10.72-20.61 14.05-5.69 3.33-12.81 7.1-15.84 8.38-3.03 1.28-6.4 2.71-7.5 3.18-1.1 0.47-5.38 1.74-9.5 2.82-4.13 1.09-11.32 2.49-16 3.12-4.79 0.64-11.55 0.84-15.5 0.45-3.85-0.38-10.38-1.57-14.5-2.64-4.13-1.07-10.2-3.39-13.5-5.16-3.3-1.76-9.2-6.35-13.1-10.2-4.96-4.88-8.03-8.97-10.15-13.5-1.68-3.57-3.77-9.31-4.65-12.75-0.91-3.54-1.59-10.26-1.59-15.5 0.01-5.09 0.61-11.5 1.33-14.25 0.73-2.75 2.95-8.15 4.95-12 2.02-3.91 6.18-9.6 9.42-12.88 3.18-3.24 8.49-7.45 11.79-9.36 3.3-1.9 6.11-3.53 6.25-3.61 0.14-0.08-0.6-3.97-1.66-8.65-1.05-4.68-2.47-13.68-3.15-20-0.76-7.06-0.99-16.13-0.59-23.5 0.36-6.6 1.54-17.18 2.63-23.5 1.09-6.33 2.37-13.3 2.85-15.5 0.48-2.2 1.64-5.8 2.58-8 0.95-2.2 2.25-4.33 2.9-4.73 0.66-0.41 2.77-0.74 4.69-0.74 1.92 0 7.55 0.86 12.5 1.9 4.95 1.05 15.08 3.91 22.5 6.35 7.43 2.44 17.21 6.31 21.75 8.58 4.54 2.28 8.7 3.92 9.25 3.64 0.55-0.28 1.28-1.96 1.62-3.75 0.34-1.79 3.04-8.09 6-14 2.96-5.91 6.2-11.99 7.19-13.5 1-1.51 3.25-4.89 5-7.5 1.76-2.61 3.19-4.98 3.19-5.25 0-0.28 2.43-3.76 5.39-7.75 2.97-3.99 8.51-10.85 12.31-15.25 3.8-4.4 8.01-8.56 9.35-9.24 1.35-0.67 2.56-1.24 2.7-1.25zm-9.4 35.2c-3.77 4.79-7.75 9.93-8.85 11.43-1.1 1.49-4.58 7.47-7.74 13.29-3.16 5.81-6.01 11.24-6.34 12.07-0.32 0.82-1.17 3.07-1.88 5-0.71 1.92-2.22 6.65-3.37 10.5-1.14 3.85-2.77 11.39-3.62 16.75-0.85 5.36-1.55 14.92-1.55 21.25 0 8.08 0.59 13.95 2 19.75 1.1 4.54 2.61 10.27 3.36 12.75 0.74 2.47 2.13 6.3 3.08 8.5 0.94 2.2 3.49 7.6 5.65 12 2.17 4.4 4.5 8.68 5.17 9.5 0.68 0.82 3.83 3.64 6.99 6.25 3.16 2.61 5.74 5.31 5.74 6-0.01 0.69-2.55 3.5-5.64 6.25-5.35 4.75-5.75 4.92-7.9 3.5-1.25-0.82-5.57-4.19-9.61-7.48-4.04-3.29-10.27-7.98-13.84-10.42-3.57-2.45-11-6.57-16.5-9.17-5.5-2.6-12.93-5.49-16.5-6.42-3.57-0.93-11.22-1.94-17-2.25-8.96-0.46-11.49-0.23-17.25 1.6-3.71 1.18-8.89 3.41-11.5 4.95-2.61 1.55-6.88 5.49-9.49 8.75-3.24 4.06-5.25 7.84-6.37 11.94-1.16 4.27-1.5 8.6-1.18 15 0.37 7.45 0.99 10.16 3.62 15.75 1.74 3.71 5.13 8.89 7.54 11.5 2.6 2.84 6.73 5.85 10.25 7.47 3.23 1.5 9.48 3.28 13.88 3.95 6.38 0.98 10.12 0.97 18.5-0.06 5.79-0.7 14.09-2.54 18.5-4.09 4.4-1.54 10.94-4.32 14.53-6.16 3.59-1.85 11.01-6.37 16.5-10.05 5.48-3.67 12.2-8.62 14.92-11 2.72-2.37 9.92-8.81 16-14.31 6.08-5.5 14.2-12.74 18.05-16.08 3.85-3.34 9.66-8.06 12.92-10.5 5.02-3.75 6.44-5.56 9.35-11.92 1.89-4.13 4.76-11.78 6.38-17 1.62-5.23 3.46-14 4.09-19.5 0.86-7.53 0.86-13.09-0.01-22.5q-1.16-12.5-4.22-22.5c-1.68-5.5-4.45-13.38-6.15-17.5-1.71-4.13-4.92-10.65-7.16-14.5-2.23-3.85-5.89-9.64-8.13-12.87-2.24-3.23-5.36-7.73-6.93-10-1.57-2.27-4.04-5.38-5.5-6.9-1.45-1.53-2.86-2.76-3.14-2.74-0.28 0.02-1.02 0.37-1.65 0.78-0.63 0.4-4.23 4.65-8 9.44zm107.65 44.24c-5.23 1.44-12.88 4.01-17 5.71-4.13 1.69-10.65 4.63-14.5 6.52-3.85 1.9-7.31 3.75-7.69 4.13-0.38 0.38-0.04 4.06 0.75 8.19 0.79 4.12 1.44 12 1.44 17.5-0.01 5.86-0.84 14.35-2.02 20.5-1.1 5.77-2.42 11.62-2.93 13-0.51 1.37-1.17 3.85-1.48 5.5l-0.55 3c21.49-5.68 23.93-5.94 38.95-5.97l16.48-0.03c2.65-10.07 3.98-17.05 4.67-22 0.68-4.95 1.22-15.75 1.19-24-0.03-9.63-0.64-18.04-1.7-23.5-0.91-4.68-1.87-9.29-2.13-10.25-0.26-0.96-0.82-1.71-1.23-1.67-0.41 0.04-1.2 0.23-1.75 0.41-0.55 0.19-5.27 1.52-10.5 2.96zm-211.68 7.55c-1.44 6.84-1.77 12.8-1.66 30.5 0.11 17.52 0.51 23.63 1.99 30l1.85 8c16.28 0.96 23.47 1.7 26.5 2.26 3.03 0.57 8.43 1.93 12 3.02 3.57 1.1 9.43 3.19 13 4.65 3.57 1.46 6.72 2.4 7 2.08 0.28-0.31-0.57-3.82-1.87-7.79-1.3-3.97-2.73-8.35-3.16-9.72-0.44-1.38-1.33-5.88-1.98-10-0.75-4.7-0.97-12.17-0.6-20 0.33-6.88 0.83-15.09 1.11-18.25l0.5-5.75c-15.89-7.83-24.32-11.41-29-13-4.67-1.6-11.42-3.6-15-4.44-3.58-0.84-6.82-1.54-7.2-1.55-0.39 0-0.92 0.33-1.2 0.74-0.27 0.41-1.29 4.57-2.28 9.25zm118.68 174.73c3.02 0.26 7.07 0.87 9 1.36 1.93 0.5 5.86 2.25 14 6.91l-7.75 4.02c-4.26 2.21-8.31 4.69-9 5.5-0.73 0.87-1.46 1.07-1.75 0.48-0.28-0.55-2.41-1.28-4.75-1.62-2.34-0.34-5.82-0.13-7.75 0.46-1.93 0.6-4.74 2-6.25 3.12-1.51 1.12-3.76 3.95-7.25 10.54l-0.3 99c-0.21 67.13 0.03 100.21 0.75 102.75 0.58 2.06 2.29 5.16 3.8 6.88 1.51 1.73 3.99 3.75 5.5 4.5 1.51 0.76 4.55 1.37 6.75 1.37 2.2 0 5.69-0.84 7.75-1.88 2.06-1.03 5.1-3.8 9.75-10.45l0.5-203.67 2.25-0.57c1.24-0.32 6.64-0.32 12 0 5.36 0.31 9.57 0.23 9.35-0.18-0.23-0.41 0.18-0.75 0.9-0.75 0.72 0 1.13 0.34 0.9 0.75-0.22 0.41 11.19 0.76 25.35 0.76 14.16 0.01 29.57 0.24 34.25 0.52 4.68 0.27 11.87 0.69 16 0.94 4.12 0.24 10.65 1.15 14.5 2.02 3.85 0.87 10.6 3.02 15 4.78 4.4 1.76 10.25 5 13 7.19 2.75 2.19 6.06 5.12 7.36 6.51 1.3 1.39 3.62 4.33 5.15 6.53 1.54 2.2 3.96 7.49 5.39 11.75 2.18 6.49 2.6 9.58 2.62 19 0.02 8.68-0.47 12.85-2.11 18.25-1.18 3.85-3.06 8.8-4.19 11-1.13 2.2-4.12 6.2-6.64 8.88-2.52 2.68-7.28 6.7-10.58 8.92-3.3 2.23-9.6 5.26-14 6.73-4.4 1.48-10.02 3.03-12.5 3.44-2.48 0.42-5.03 1.04-5.68 1.39-0.75 0.41 5.01 8.81 15.86 23.14 9.37 12.37 18.34 24.3 19.93 26.5 1.59 2.2 5.35 7.15 8.35 11 2.99 3.85 9.4 12.11 14.24 18.37 6.48 8.37 10.38 12.4 14.8 15.29 3.3 2.16 6.68 4.11 7.5 4.33 0.82 0.21 3.41 0.87 5.75 1.45 4.13 1.03 4.24 1.17 3.75 8.56l-12.5-0.09c-9.89-0.07-14.07-0.56-20-2.34-4.13-1.23-9.97-3.67-12.99-5.41-3.02-1.74-7.52-5.2-10-7.7-2.48-2.49-7.45-8.34-11.04-13-3.59-4.65-10.79-14.47-16-21.81-5.21-7.34-13.07-18.4-17.47-24.56-4.4-6.17-11.38-15.78-23-31.54l-32.5-0.05v-10l17.25-0.07c9.49-0.04 21.07-0.28 25.75-0.52 4.67-0.25 11.09-1.12 14.25-1.93 3.16-0.81 8.34-2.82 11.5-4.45 3.16-1.63 7.11-4.22 8.76-5.75 1.66-1.53 4.41-4.8 6.11-7.28 1.69-2.48 4.1-7.2 5.34-10.5 1.61-4.28 2.4-9.01 2.75-16.5 0.37-7.64 0.06-12.34-1.1-17.25-0.89-3.71-2.74-9-4.11-11.75-1.38-2.75-4.52-7.02-7-9.5-2.48-2.48-7.31-5.85-10.75-7.49-3.44-1.64-9.4-3.66-13.25-4.48-5.35-1.14-14.38-1.5-69.5-1.53l-0.03 88.75c-0.02 48.81-0.4 91.67-0.85 95.25-0.44 3.57-2 9.09-3.46 12.25-1.47 3.16-5.02 8.26-7.91 11.32-2.89 3.07-7.5 6.67-10.25 8-2.75 1.33-8.15 3.09-12 3.91-3.85 0.82-9.03 1.49-11.5 1.49-2.48 0-7.65-0.68-11.5-1.51-3.85-0.82-9.25-2.52-12-3.78-2.75-1.25-7.17-4.28-9.83-6.73-2.66-2.45-5.89-6.25-7.18-8.45-1.29-2.2-3.05-6.7-3.92-10-1.38-5.23-1.58-16.25-1.59-165l-3.33 6c-1.83 3.3-5.82 10.73-8.86 16.5-3.03 5.77-12.16 23.1-20.28 38.5-8.12 15.4-17.91 34.07-21.77 41.5-3.85 7.42-9.49 18-12.54 23.5-3.05 5.5-6.26 10.8-7.12 11.78-0.92 1.04-2.93 1.77-4.83 1.75-2.6-0.02-3.62-0.68-5.12-3.28-1.02-1.79-3.32-5.95-5.1-9.25-1.78-3.3-5.98-10.95-9.32-17-3.35-6.05-8.25-14.71-10.9-19.25-2.64-4.54-4.81-8.48-4.81-8.75 0-0.27-3.54-6.69-7.87-14.25-4.33-7.56-11.82-20.73-16.64-29.25-4.82-8.52-10.74-18.88-13.16-23-2.41-4.13-5.16-9.18-6.11-11.22-0.95-2.05-2.06-3.74-2.47-3.75-0.41-0.02-0.75 42.49-0.75 188.97h-11v-226l9.97 0.25c8.44 0.21 10.27 0.56 11.94 2.25 1.09 1.1 8.14 12.8 15.68 26 7.53 13.2 14.46 25.35 15.39 27 0.94 1.65 6.12 10.87 11.53 20.5 5.4 9.62 13.85 24.7 18.78 33.5 4.93 8.8 11.16 20.16 13.84 25.25 2.68 5.09 5.21 9.25 5.62 9.25 0.41 0 4.69-7.54 9.5-16.75 4.82-9.21 11.36-21.7 14.55-27.75 3.18-6.05 9.42-17.98 13.86-26.5 4.43-8.52 11.35-21.8 15.36-29.5 4.01-7.7 8.96-16.93 10.99-20.5 2.03-3.58 6.77-12.35 10.53-19.5 4.78-9.09 8.55-14.8 12.54-19 3.14-3.3 8.12-7.33 11.06-8.95 2.95-1.62 7.61-3.47 10.36-4.11 2.75-0.64 7.47-0.96 10.5-0.71z"
                />
                <path
                  id="Path 1"
                  className="s1"
                  fillOpacity={0.3}
                  d="m236.5 274.6c-3.85 1.98-7.3 4.11-7.68 4.75-0.37 0.63 0.33 2.27 1.56 3.65 1.22 1.37 2.53 3.4 2.91 4.5 0.56 1.66 1.74 2.06 6.95 2.34 3.44 0.18 8.85 0.41 12.01 0.5 3.16 0.09 5.75-0.18 5.75-0.59 0-0.41 0.45-0.52 1-0.25 0.55 0.27 1.01 0.16 1.01-0.25 0.01-0.41-1.38-3-3.09-5.75-1.7-2.75-4.86-6.69-7.01-8.75-2.15-2.06-4.47-3.75-5.16-3.75-0.69 0.01-4.4 1.63-8.25 3.6z"
                />
                <path
                  id="Path 2"
                  className="s0"
                  fillOpacity={0.5}
                  d="m207.48 126l-7.98 8c12.4 12.41 16.23 16.02 16.5 16.02 0.28 0.01 4.01-3.26 8.29-7.26 4.29-3.99 7.78-7.94 7.76-8.76-0.02-0.82-3.3-4.76-7.29-8.74-3.99-3.99-7.72-7.25-8.28-7.25-0.57-0.01-4.62 3.59-9 7.99z"
                />
              </g>
              {/* <path
                          fill-rule="evenodd"
                          d="m78 23 3.87 11.25c2.13 6.19 8.77 25.31 14.75 42.5 5.99 17.18 11.22 31.24 11.63 31.25.41 0 1.02-1.01 1.35-2.25.33-1.24.76-2.92.96-3.75.19-.83 6.36-18.82 27.05-78.5l22.7-.25c17.76-.2 22.62.02 22.35 1-.19.69-1.77 1.59-3.5 2-1.86.44-3.98 1.99-5.16 3.75-1.95 2.92-2 4.67-2 128l3.5 3.5c1.93 1.93 4.4 3.5 5.5 3.5 1.1 0 2 .45 2 1 0 .64-10.67 1-30 1s-30-.36-30-1c0-.55.67-1 1.5-1s2.74-.61 4.25-1.36c1.51-.75 3.54-3 4.5-5 1.61-3.36 1.73-8.18 1.25-121.01l-21.8 62.93c-12 34.62-22.21 63.62-22.7 64.44-.49.83-1.06 1.28-1.27 1-.21-.27-10.24-29.07-44.23-127.5l-.23 39c-.2 32.58 0 39.25 1.19 40.5.78.83 2.16 3.3 3.07 5.5.91 2.2 1.63 6.48 1.61 9.5-.04 3.76-.8 6.93-2.41 10-1.29 2.48-2.98 4.5-3.76 4.5-.77 0-2.42-1.8-3.66-4-1.24-2.2-2.54-6.02-2.89-8.5-.39-2.75-.11-6.24.72-8.97.75-2.46 2.15-5.5 3.11-6.75 1.61-2.1 1.73-5.55 1.5-43.53-.24-39.5-.34-41.4-2.3-44.75-1.49-2.56-3.17-3.84-6.25-4.75-2.31-.69-4.2-1.7-4.2-2.25 0-.64 8.67-1 48-1zM21.5 132c2.26-.01 6.18 1.04 9 2.42 4.1 2 5.3 3.21 6.69 6.76.93 2.38 2.4 4.88 3.25 5.57.86.69 1.33 1.7 1.06 2.25-.28.55-1.96 1.03-3.75 1.06-2.71.06-2.92.21-1.25.91 1.1.47 4.92 3.82 8.5 7.45 5.09 5.17 7.15 6.61 9.5 6.63 1.71.02 3.62-.73 4.45-1.76.8-.98 1.45-2.69 1.45-3.79s-.65-2.81-1.45-3.79c-.84-1.05-2.71-1.77-4.45-1.73-1.69.03-3.99 1.04-5.26 2.29-1.79 1.76-2.53 1.97-3.5 1-.98-.97-.83-1.67.76-3.36 1.1-1.18 2.9-2.51 4-2.96 1.81-.75 1.77-.83-.5-.86-1.38-.02-2.84-.27-3.25-.56-.41-.29.71-3.3 2.5-6.69 2.77-5.26 3.98-6.51 8.25-8.49 2.75-1.28 6.91-2.33 9.25-2.34 2.43-.01 4.5.52 4.83 1.24.32.69-.09 2.6-.91 4.25-.82 1.65-2.77 4.19-4.33 5.64-1.56 1.45-4.3 3.36-6.09 4.25-1.79.88-4.04 1.64-5 1.69-.96.04-.25.6 1.57 1.25 1.83.64 4.21 2.3 5.3 3.67 1.08 1.38 1.96 3.85 1.96 5.5-.01 1.65-.93 4.24-2.05 5.75-1.71 2.32-2.77 2.75-6.78 2.78-4.52.02-5.12-.32-12.25-6.98-5.38-5.03-8.26-7.02-10.18-7.03-1.47-.01-3.38.66-4.25 1.48-.86.83-1.56 2.51-1.54 3.75.01 1.24.8 3.05 1.75 4.03.94.98 2.84 1.76 4.22 1.73 1.37-.03 3.5-1.06 4.73-2.28 1.54-1.54 2.78-1.99 4-1.46 1.58.69 1.45 1.08-1.23 3.77-2.47 2.47-3.8 2.99-7.5 2.96-3.27-.03-5.12-.65-6.78-2.27-1.61-1.58-2.27-3.39-2.27-6.23 0-2.86.65-4.62 2.27-6.18 1.26-1.19 3.63-2.5 8.28-3.63l-4-1.14c-2.2-.62-5.46-2.13-7.25-3.34-1.79-1.22-4.49-4.28-6-6.81-2.34-3.91-2.53-4.72-1.25-5.48.82-.49 3.3-.9 5.5-.92zm6.84-11c.64.01 2.62.91 4.41 2 2.97 1.83 3.25 2.44 3.25 7 0 2.75-.23 5-.5 5-.28 0-2.19-.87-4.25-1.93-2.25-1.16-4.05-2.96-4.5-4.5-.41-1.41-.48-3.69-.16-5.07.32-1.37 1.11-2.5 1.75-2.5zm31.41.04c.84-.03 1.25 1.6 1.25 4.96 0 4.91-.08 5.04-4.25 6.97-2.34 1.08-4.3 1.87-4.37 1.75-.06-.12-.4-2.36-.75-4.97-.62-4.7-.59-4.77 3.12-6.71 2.06-1.07 4.31-1.97 5-2z"
                        /> */}
            </svg>
          </div>
          <h1
            className={`mt-4 mb-2 text-3xl md:text-4xl lg:text-5xl text-white tracking-wider font-elsie uppercase font-medium`}
          >
            Mantrana
          </h1>
          <p
            className={`text-xl md:text-2xl text-white/70 mb-6 font-elsie uppercase`}
          >
            Therapy by Mohana Rupa
          </p>
          <p className="text-lg text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
            Providing compassionate guidance through digital-age challenges,
            life transitions, and inner struggles—helping you navigate these to
            find clarity and strength.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/book"
              className="bg-white text-[#8d2a65] rounded-full font-semibold text-lg px-10 py-5"
            >
              Book a Session
            </Link>
            <Link
              href="/about"
              className="border-2 rounded-full text-white text-lg px-10 py-5"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
      <img
        src="/images/rupa_doodle.png"
        className="absolute top-40 right-0 w-32 md:w-48 lg:w-64"
      />
    </section>
  );
}

// About Preview Section
function AboutSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2
              className={`text-4xl lg:text-5xl text-gray-900 mb-6 font-elsie`}
            >
              Meet Mohana Rupa Nekkanti
            </h2>
            <p className={`text-2xl mb-6 font-elsie text-[var(--teal)]`}>
              Psychotherapist &amp; Behavioral Specialist
            </p>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Namaste!
              <br />I am Mohana Rupa Nekkanti, founder of Mantrana therapy. I am
              a Psychotherapist and Behavioural Specialist with a Ph.D. in
              Applied Psychology and advanced certifications in Clinical
              Hypnosis and Neuro-Linguistic Programming.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              As a Behavioral Specialist, I help individuals reshape unhelpful
              patterns—whether it's digital habits, stress responses, or
              relationship dynamics—so they can live with greater balance and
              clarity.
            </p>
            <Link href="/about" className="btn-pill btn-primary">
              Read My Story
            </Link>
          </div>
          <div className="bg-azure/40 rounded-3xl h-96 lg:h-128 shadow-soft overflow-hidden">
            <img
              src="/images/mohana_rupa.png"
              className="w-full h-full object-cover object-[20%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// About Preview Section
function AboutMantranaSection() {
  return (
    <section className="section-padding lg:pt-0 bg-white">
      <div className="container-custom ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="bg-azure/40 rounded-3xl h-96 lg:h-128 shadow-soft  overflow-hidden">
            <img
              src={"/images/indian_mental_health.jpg"}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2
              className={`text-4xl lg:text-5xl text-gray-900 mb-6 font-elsie`}
            >
              What is Mantrana?
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              The name <em>Mantrana</em> is derived from Sanskrit, meaning{" "}
              <strong>counsel, guidance, or thoughtful conversation</strong>. It
              perfectly captures the essence of therapy as I see it—not about
              giving advice or ready-made solutions, but walking alongside you
              as you uncover your own clarity and direction.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              At Mantrana, therapy is a dedicated space to pause, reflect, and
              realign. Our approach blends evidence-based techniques such as
              Neuro-Linguistic Programming (NLP), Hypnosis, and Cognitive
              Restructuring with timeless insights inspired by Indian wisdom
              traditions. Each session is designed to create balance—between
              reflection and action, challenges and strengths, inner struggles
              and new possibilities.
            </p>
            <Link href="/about" className="btn-pill btn-primary">
              Read More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// Services Section
function ServicesSection() {
  const services = [
    {
      title: "Individual Therapy",
      description:
        "A safe, non-judgmental space for self-reflection and personal growth through evidence-based approaches.",
      icon: "🧠",
    },
    {
      title: "Digital-Age Challenges",
      description:
        "Support for digital addiction, stress, and navigating life in the modern world with mindfulness.",
      icon: "📱",
    },
    {
      title: "Life Transitions",
      description:
        "Compassionate guidance through major life changes, relationships, and inner struggles.",
      icon: "🌱",
    },
    {
      title: "Personal Growth",
      description:
        "Empowering you to discover clarity and strength through Cognitive Restructuring, NLP, and Hypnosis.",
      icon: "✨",
    },
  ];

  return (
    <section className="section-padding bg-azure/35">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className={`text-4xl lg:text-5xl text-gray-900 mb-6 font-elsie`}>
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            ✨ What Mantrana Offers: Support for digital addiction, stress,
            relationships, and personal growth through evidence-based approaches
            and insights inspired by Indian philosophical wisdom.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-soft hover:shadow-medium transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="text-4xl mb-6">{service.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
        {/* <div className="text-center mt-12">
          <Link href="/services" className="btn-pill btn-primary">
            Explore All Services
          </Link>
        </div> */}
      </div>
    </section>
  );
}

// Testimonials Section
function TestimonialsSection() {
  const testimonials = [
    {
      name: "Aruna M.",
      text: "Mohana's guidance helped me overcome my anxiety and find peace within myself. The sessions were transformative.",
      rating: 5,
    },
    {
      name: "Raj K.",
      text: "Professional, compassionate, and incredibly insightful. My life coaching sessions have changed my perspective completely.",
      rating: 5,
    },
  ];

  return (
    <section className="section-padding bg-white" id="testimonials">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            What Clients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Real stories from people who have experienced positive
            transformation through our services.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-lavender/40 rounded-2xl p-8">
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-amaranth fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed italic">
                "{testimonial.text}"
              </p>
              <p className="font-semibold text-gray-900">
                — {testimonial.name}
              </p>
            </div>
          ))}
        </div>
        {/* <div className="text-center mt-12">
          <Link href="/testimonials" className="btn-pill btn-secondary">
            Read More Testimonials
          </Link>
        </div> */}
      </div>
    </section>
  );
}

// Blog Preview Section
function BlogSection() {
  const blogPosts = [
    {
      title: "Understanding Anxiety: A Guide to Managing Daily Stress",
      excerpt:
        "Learn practical techniques to manage anxiety and create a more peaceful daily routine.",
      category: "Mental Health",
      readTime: "5 min read",
      slug: "understanding-anxiety-managing-daily-stress",
      image: "/images/anxiety-stress-management.png",
    },
    {
      title: "The Power of Mindfulness in Relationships",
      excerpt:
        "Discover how mindfulness practices can improve communication and deepen connections.",
      category: "Relationships",
      readTime: "7 min read",
      slug: "power-of-mindfulness-in-relationships",
      image: "/images/mindfulness-relationships.png",
    },
    {
      title: "Building Resilience: Tools for Life's Challenges",
      excerpt:
        "Explore strategies to build emotional resilience and navigate life's ups and downs.",
      category: "Personal Growth",
      readTime: "6 min read",
      slug: "building-resilience-tools-for-challenges",
      image: "/images/resilience-personal-growth.png",
    },
  ];

  return (
    <section className="section-padding bg-lavender/35">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Latest Insights
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Helpful articles and insights on mental health, personal growth, and
            wellness to support your journey.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <Link key={index} href={`/blog/${post.slug}`}>
              <article className="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
                <div className="h-48 relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4">
                    <span className="text-xs font-medium text-moss bg-white/90 px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-500">Recent</span>
                    <span className="text-sm text-gray-500">
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight hover:text-moss transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/blog" className="btn-pill btn-primary">
            Read All Articles
          </Link>
        </div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  return (
    <section className="section-padding bg-lavender">
      <div className="container-custom text-center">
        <div className="rounded-3xl p-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-black mb-6">
            Begin Your Journey Today
          </h2>
          <p className="text-xl text-black/90 max-w-2xl mx-auto mb-12 leading-relaxed">
            Take the first step towards healing, growth, and inner clarity. Book
            a session or start with a free consultation call.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/book"
              className="btn-pill text-white btn-primary border-[#D56989] font-semibold border-2 text-lg px-10 py-5"
            >
              Book a Session
            </Link>
            <Link
              href="/contact"
              className="btn-pill border-2 border-[#D56989] text-[#D56989] font-semibold text-lg px-10 py-5"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <main>
      <Header />
      <HeroSection />
      <AboutSection />
      <AboutMantranaSection />
      <ServicesSection />
      <TestimonialsSection />
      <BlogSection />
      <CTASection />
      <Footer />
    </main>
  );
}
