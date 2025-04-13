/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
  	extend: {
		fontFamily: {
			montserrat: ['Montserrat', 'sans-serif'],
			pressStart: ['"Press Start 2P"', 'cursive'],
		  },
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: {
				DEFAULT:'hsl(var(--background))',
				button: 'hsl(var(--backgroundButton))',
				buttonDate: 'hsl(var(--backgroundButtonDate))',
				datePicker: 'var(--backgroundDatePicker)',
				card: 'var(--backgroundCard)',
				invert: 'var(--backgroundInvert)',
				secondary: 'var(--backgroundSecondary)',
				select: 'var(--backgroundSelect)'
			},		
  			foreground: 'hsl(var(--foreground))',		
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
			,text: {
				invert:'var(--textInvert)',
				placeholder:'var(--textPlaceholder)',
				primary: 'hsl(var(--textPrimary))', 
				secondary: 'hsl(var(--textSecondary))', 
				third: 'var(--textThird)'
		
			  },
  		},
  	}
  },
  plugins: [require("tailwindcss-animate")],
}
