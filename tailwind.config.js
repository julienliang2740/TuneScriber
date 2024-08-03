/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
	"./src/**/*.{html,js}"
  ],
  theme: {
    extend: {
		colors: {
			violet: '#252273'
		},
		fontFamily: {
			inter: ['Inter', 'sans-serif']
		},
		fontSize: {
			small: '14px',
			medium: '24px',
			large: '36px'
		}
	},
  },
  plugins: [],
}

