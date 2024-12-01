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
		   
			'max-2xl': { max: '1537px' },
			  "2xl": "1536px",
			"3xl": {max: "1471px"},
			"6xl": {max: "1329px"},
			"7xl": {max: "1302px"},
			"4xl": {max: '1287px'},
			"max-xl": {max: '1287px'},
			"lg-3": {max: '1248px'},
			"5xl": {max: '1205px'},
			"8xl": {max: "1204px"},
			"lg-1189": {max: '1189px'},
			"lg-1178": {max: "1178px"},
			"lg-1163": {max: "1163px"},
			"lg-2": {max: '1144px'},
			
			"lg-1": {max: '1097px'},
			"lg-1093": {max: "1093px"},
			"lg-1091": {max: "1091px"},
			"lg-1074": {max: "1074px"},
			"9xl": {max: "1049px"},
			"max-lg": {max: '1024px'},
			"lg-5": {max: '1024px'},
			"lg-4": {max: '1020px'},
			"sm-991": {max: '991px'},
			"sm-2": {max: '986px'},
			"sm-961": {max: '961px'},
			"sm-951": {max: "951px"},
			"sm-949": {max: '949px'},
			"sm-12": {max: '944px'},
			"sm-3": {max: '944px'},
			"sm-4": {max: '871px'},
			"sm-5": {max: '866px'},
			"sm-817": {max: '817px'},
			"sm-805": {max: "805px"},
			"sm-20": {max: "768px"},
			"sm-742": {max: '742px'},
			"sm-700": {max: "700px"},
			"sm-694": {max: '694px'},
			"sm-15": {max: '677px'},
			"sm-660": {max: '660px'},
			"sm-659": {max: "659px"},
			"sm-7": {max: '656px'},
			"sm-654": {max: "654px"},
			"sm-16": {max: '642px'},
			"sm-6": {max: '640px'},
			
			"sm-8": {max: '628px'},
			"sm-617": {max: "617px"},
			"sm-611": {max: '611px'},
			"sm-603": {max: '603px'},
			"sm-588": {max: '588px'},
			"sm-583": {max: '583px'},
			"sm-575": {max: "575px"},
			"sm-555": {max: '555px'},
			"sm-547": {max: '547px'},
			"sm-542": {max: '542px'},
			"sm-525": {max: "525px"},
			"sm-521": {max: '521px'},
			"sm-516": {max: '516px'},
			"sm-14": {max: '499px'},
			"sm-493": {max: "493px"},
			"sm-13": {max: '479px'},
			"sm-465": {max: '465px'},
			"sm-448px": {max: "448px"},
			"sm-441": {max: '441px'},
			"sm-17": {max: '436px'},
			"base-sm": {max: '427px'},
			"sm-417": {max: '417px'},
			"sm-11": {max: '405px'},
			"sm-18": {max: '394px'},
			"sm-383": {max: '383px'},
			"sm-19": {max: '379px'},
			"min-sm": {max: '377px'},
			"sm-370": {max: '370px'},
			"max-sm": {max: '320px'} // Ultra large screens
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