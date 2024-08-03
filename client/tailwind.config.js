/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
	"./src/**/*.{html,js}"
  ],
  theme: {
    extend: {
		colors: {
			violet: '#252273',
			purple: '#363470'
		},
		fontFamily: {
			inter: ['Inter', 'sans-serif']
		},
		fontSize: {
			small: '14px',
			medium: '24px',
			large: '36px'
		},
		maxWidth: {
			small: '175px',
			medium: '300px',
			large: '350px',
			xLarge: '500px'
		}
	},
  },
  plugins: [
  ],
}
  

