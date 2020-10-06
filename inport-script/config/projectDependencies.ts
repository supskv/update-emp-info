import ProdDatabaseServices from '../database/ProdDatabaseService'
// import DevDatabaseServices from '../frameworks/persistances/development/DevDatabaseService'

export default (() => {
  return {
    prodDatabaseService: new ProdDatabaseServices(),
    // devDatabaseService: new DevDatabaseServices(),
  }
})()
