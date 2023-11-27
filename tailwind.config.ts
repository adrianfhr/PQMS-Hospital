import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-bluewhite':'linear-gradient(180deg,rgba(0, 144, 158, 0.3),rgba(0, 144, 158, 0))',
        'landing-page' : 'url(/images/background-pqms-fix.png)',
        'spesialist' : 'url(/images/background-spesialist.png)',
        'live-queue' : 'url(/images/background-live-queue.png)'
      },
      colors:{
        'light-blue':'#00909E',
        'gray-blue':'#27496D',
        'dark-blue':'#142850'
      },
      fontFamily: {
        poppins : ['Poppins', 'sans-serif'],
        yesavan : ['Yeseva-One'],
        
      },
      gradientText: {
        'gradient-text': 'linear-gradient(180deg, #00909E 0%, rgba(0, 144, 158, 0) 214.81%), linear-gradient(180deg, #142850 0%, rgba(20, 40, 80, 0) 100%)',
        '-webkit-background-clip': 'text',
        'color': 'transparent',
      },
    },
    screens:{
      'sm':'640px',
      'md':'768px',
      'lg':'1024px',
      'xl':'1440px',
    }
  },
  plugins: [require('@tailwindcss/typography'),require('@tailwindcss/forms')],
}
export default config
