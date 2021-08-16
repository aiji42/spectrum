import { Inspector } from 'next-fortress/build/inspector'
import { controller } from 'next-fortress/build/controller'
import { firebase } from 'next-fortress/build/firebase'
const inspector = new Inspector().add(firebase)
export const getServerSideProps = async (ctx) => {
  return controller(inspector, ctx)
}
const Fortress = () => null
export default Fortress
