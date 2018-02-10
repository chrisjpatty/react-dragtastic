import Basic from './pages/Basic'
import Advanced from './pages/Advanced'
import basicImg from './common/img/basic-demo.svg'
import advancedImg from './common/img/advanced-demo.svg'

const demos = [
  {
    title: 'Basic Examples',
    page: Basic,
    path: 'basic',
    img: basicImg
  },
  {
    title: 'Sortable Examples',
    page: Advanced,
    path: 'sortable',
    img: advancedImg
  }
]
export default demos
