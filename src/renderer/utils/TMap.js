export function TMap(key) {
  return new Promise(function (resolve, reject) {
    /* eslint-disable */
    window.init = function () {
      resolve(qq)
    }
    
    /* eslint-enable */
    let tMap = document.getElementById("TMapScript")
    var script = document.createElement("script")
    script.type = "text/javascript"
    script.id = "TMapScript"
    script.src = "https://map.qq.com/api/js?v=2.exp&callback=init&key=" + key
    script.onerror = reject
    document.head.appendChild(script)
  })
}
