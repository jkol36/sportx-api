import { expect } from 'chai'
import agent from 'superagent-bluebird-promise'

const leagueId = 2
const marketHashes = []
describe('sportx api', () => {
  it('should get all active markets', done => {
    agent
    .get('https://app.api.sportx.bet/markets/active')
    .then(res => {
      const { markets } = res.body.data
      markets.forEach(({marketHash}) => marketHashes.push(marketHash))
      //console.log(marketHashes[0])
      expect(markets).to.be.an.array
      expect(res.status).to.eq(200)
      done()
    })
    .catch(console.log)
  })
  it('should get popular markets', done => {
    agent
    .get('https://app.api.sportx.bet/markets/popular')
    .then(res => {
      const { markets } = res.body.data
      expect(markets).to.be.an.array
      expect(res.status).to.eq(200)
      done()
    })
  })
  it('should get all leagues', done => {
    agent
    .get('https://app.api.sportx.bet/leagues')
    .then(res => {
      const { leagues } = res.body.data
      expect(leagues).to.be.an.array
      expect(res.status).to.eq(200)
      done()
    })
  })
  it('should get active leagues', done => {
    agent
    .get('https://app.api.sportx.bet/leagues/active')
    .then(res => {
      const { leagues } = res.body.data
      expect(leagues).to.be.an.array
      expect(res.status).to.eq(200)
      done()
    })
  })
  it('should get all sports', done => {
    agent
    .get('https://app.api.sportx.bet/sports')
    .then(res => {
      const { sports } = res.body.data
      expect(sports).to.be.an.array
      expect(res.status).to.eq(200)
      done()
    })
  })
  it('should get all active fixtures for league', done => {
    agent
    .get(`https://app.api.sportx.bet/fixture/active?leagueId=${leagueId}`)
    .then(res => {
      const { fixtures } = res.body.data
      expect(fixtures).to.be.an.array
      expect(res.status).to.eq(200)
      done()
    })
  })
  //it('should get all live scores', done => {
    //agent
    //.post(`https://app.api.sportx.bet/live-scores`)
    //.set('sportXEventIds', ["1","2","3"])
    //.then(res => {
      //const { data } = res.body
      //expect(data).to.be.an.array
      //expect(res.status).to.eq(200)
      //done()
    //})
  //})
  it('should get meta data', done => {
    agent
    .get(`https://app.api.sportx.bet/metadata`)
    .then(res => {
      const { data } = res.body
      expect(data).to.be.an.object
      expect(res.status).to.eq(200)
      done()
    })
  })
  it('should get active orders', done => {
    agent
    .post(`https://app.api.sportx.bet/orders`)
    .send({marketHashes: marketHashes.splice(10, 20)})
    .then(res => {
      const { data } = res.body
      expect(data).to.be.an.array
      expect(res.status).to.eq(200)
      done()
    })
    .catch(console.log)
  })
  
})