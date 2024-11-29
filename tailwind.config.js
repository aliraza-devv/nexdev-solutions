/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: [
	  "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
	  "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
	  "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	  "./src/sections/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
	  extend: {
		screens: {
			
		  sm: "640px", // Small screens
		  md: "768px", // Medium screens
		  lg: "1024px", // Large screens
		  xl: "1280px", // Extra-large screens
		   // 2X large screens
		  // Custom breakpoints
		  xs: "480px", // Extra small screens
		  "3xl": "1440px",
		  'max-2xl': { max: '1537px' },
		  "2xl": "1536px",
		  "max-xl": {max: '1287px'},
		  "max-lg": {max: '1024px'},
		  
		  "sm-2": {max: '986px'},
		  "sm-3": {max: '944px'},
		  "sm-4": {max: '871px'},
		  "sm-5": {max: '866px'},
		  "sm-6": {max: '640px'},
		  "xs-1": {max: '493px'},
		  "xs-2": {max: '408px'},
			"lg-1": {max: '1097px'},
			"lg-2": {max: '1144px'},
			"lg-3": {max: '1248px'},
			"lg-4": {max: '1020px'},
			"sm-7": {max: '656px'},
			"sm-8": {max: '628px'},
			"sm-9": {max: '470px'},
			"sm-10": {max: '460px'},
			"sm-11": {max: '405px'},
			"4xl": {max: '1287px'},
			"sm-12": {max: '944px'},
			"sm-13": {max: '479px'},
			"sm-14": {max: '499px'},
			"5xl": {max: '1205px'},
			"sm-15": {max: '677px'},
			"sm-16": {max: '642px'},
			"sm-17": {max: '436px'},
			"sm-18": {max: '394px'},
			"sm-19": {max: '379px'},
			"sm-20": {max: '768px'},
			"lg-5": {max: '1024px'},
			"base-sm": {max: '427px'},
			"min-sm": {max: '377px'},
			"max-sm": {max: '320px'}// Ultra large screens
		},
		animation: {
		  grid: "grid 15s linear infinite",
		  marquee: "marquee var(--duration) linear infinite",
		  "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
		  "spin-around": "spin-around calc(var(--speed) * 2) infinite linear",
		  slide: "slide var(--speed) ease-in-out infinite alternate",
		  "border-beam": "border-beam calc(var(--duration)*1s) infinite linear",
		  gradient: "gradient 8s linear infinite",
		  shine: "shine var(--duration) infinite linear",
		  pulse: "pulse var(--duration) ease-out infinite",
		},
		keyframes: {
		  gradient: {
			to: {
			  backgroundPosition: "var(--bg-size) 0",
			},
		  },
		  grid: {
			"0%": {
			  transform: "translateY(-50%)",
			},
			"100%": {
			  transform: "translateY(0)",
			},
		  },
		  marquee: {
			from: {
			  transform: "translateX(0)",
			},
			to: {
			  transform: "translateX(calc(-100% - var(--gap)))",
			},
		  },
		  "marquee-vertical": {
			from: {
			  transform: "translateY(0)",
			},
			to: {
			  transform: "translateY(calc(-100% - var(--gap)))",
			},
		  },
		  "spin-around": {
			"0%": {
			  transform: "translateZ(0) rotate(0)",
			},
			"15%, 35%": {
			  transform: "translateZ(0) rotate(90deg)",
			},
			"65%, 85%": {
			  transform: "translateZ(0) rotate(270deg)",
			},
			"100%": {
			  transform: "translateZ(0) rotate(360deg)",
			},
		  },
		  slide: {
			to: {
			  transform: "translate(calc(100cqw - 100%), 0)",
			},
		  },
		  "border-beam": {
			"100%": {
			  "offset-distance": "100%",
			},
		  },
		  shine: {
			"0%": {
			  "background-position": "0% 0%",
			},
			"50%": {
			  "background-position": "100% 100%",
			},
			to: {
			  "background-position": "0% 0%",
			},
		  },
		  pulse: {
			"0%, 100%": {
			  boxShadow: "0 0 0 0 var(--pulse-color)",
			},
			"50%": {
			  boxShadow: "0 0 0 8px var(--pulse-color)",
			},
		  },
		},
		borderRadius: {
		  lg: "var(--radius)",
		  md: "calc(var(--radius) - 2px)",
		  sm: "calc(var(--radius) - 4px)",
		},
		colors: {
		  background: "hsl(var(--background))",
		  foreground: "hsl(var(--foreground))",
		  card: {
			DEFAULT: "hsl(var(--card))",
			foreground: "hsl(var(--card-foreground))",
		  },
		  popover: {
			DEFAULT: "hsl(var(--popover))",
			foreground: "hsl(var(--popover-foreground))",
		  },
		  primary: {
			DEFAULT: "hsl(var(--primary))",
			foreground: "hsl(var(--primary-foreground))",
		  },
		  secondary: {
			DEFAULT: "hsl(var(--secondary))",
			foreground: "hsl(var(--secondary-foreground))",
		  },
		  muted: {
			DEFAULT: "hsl(var(--muted))",
			foreground: "hsl(var(--muted-foreground))",
		  },
		  accent: {
			DEFAULT: "hsl(var(--accent))",
			foreground: "hsl(var(--accent-foreground))",
		  },
		  destructive: {
			DEFAULT: "hsl(var(--destructive))",
			foreground: "hsl(var(--destructive-foreground))",
		  },
		  border: "hsl(var(--border))",
		  input: "hsl(var(--input))",
		  ring: "hsl(var(--ring))",
		  chart: {
			"1": "hsl(var(--chart-1))",
			"2": "hsl(var(--chart-2))",
			"3": "hsl(var(--chart-3))",
			"4": "hsl(var(--chart-4))",
			"5": "hsl(var(--chart-5))",
		  },
		},
	  },
	  variants: {
		extend: {
		  backgroundColor: ["hover"],
		},
		fontFamily: {
			'bricolage-grotesque': ['"Bricolage Grotesque"', 'serif'], // Define custom font
		  },
	  },
	},
	plugins: [require("tailwindcss-animate")],
  };