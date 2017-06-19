const html = require('choo/html')
const prettyBytes = require('pretty-bytes')
const circle = require('./circle')
const css = require('sheetify')

module.exports = function hyperhealth (state, emit) {
  const data = state.archive.health
  if (!data) return ''
  var peers = data.peers.length
  var completedPeers = data.completedPeers.length
  var progressPeers = data.progressPeers.length

  function plural (num) {
    return num > 1 || num === 0 ? 's' : ''
  }

  var styles = css`
  
  .dat-details {
    padding-top: 1.5rem;
    padding-bottom: .25rem;
  }

  .dat-detail {
    display: inline-block;
    margin-right: 1rem;
    color: $color-neutral-60;
    @media only screen and (min-width: $md1) {
      margin-right: 1.5rem;
    }
    p {
      margin-bottom: 0;
    }
  }
  `


  return html`
  <div class="${styles}">
  <div class="dat-details">
    <div class="dat-detail f4">${prettyBytes(data.byteLength)}</div>
    <div class="dat-detail f4">${peers > 0 ? html`
            <span>${completedPeers} Completed Peer${plural(completedPeers)}</span>
          `
        : ''}
    </div>
  </div>
  <div>
    <div class="f5">${progressPeers} peer${plural(progressPeers)} downloading</div>
      ${data.peers.map((peer, i) => {
        const prog = (peer.have * 100) / peer.length
        if (prog < 100) return circle(prog)
      })}
  </div>
  `
}
