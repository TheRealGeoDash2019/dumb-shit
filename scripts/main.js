(async () => {
  console.log("Logged in User's Token: " + localStorage.token.replaceAll("\"", "").split(".").map((tokenPart, index) => {if (index > 1) return tokenPart.split("").map(char => "*").join(""); else return tokenPart;}).filter(tokenPart => tokenPart != null).join("."));
  
  let APIToken = localStorage.token.replaceAll("\"", "")

  // Some Functions I made for Discord Sites

  sendUnrestricted = (payloadBody, urlOverride, token) => {
    return new Promise((resolve, reject) => {
      let tempURL = urlOverride? urlOverride : document.location.href
      let config = {
        currentURL: new URL(tempURL),
        permittedEnding: "/channels/",
        pathSplit: (new URL(tempURL)).pathname.replace("/", "").split("/"),
        isAllowed: (["cord.geomusic.tech"].includes((new URL(tempURL)).host) && (new URL(tempURL)).pathname.startsWith("/channels/") && !(((new URL(tempURL)).pathname.replace("/", "").split("/")).length > 4)),
        channel: "",
        guild: "",
        token: (APIToken? APIToken : token)
      };
        
      if (config.isAllowed) {
        config.channel = config.pathSplit[2]
        config.guild = config.pathSplit[1]
        fetch(config.currentURL.origin + "/api/v9/channels/" + config.channel + "/messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": config.token.replaceAll('"', "")
          },
          body: JSON.stringify(payloadBody)
        }).then(res => {
          res.json().then(json => {
            resolve(json)
          }).catch(err => {
            reject(err)
          })
        }).catch(err => {
          reject(err)
        })
      } else {
        resolve({message: "This is not a Permitted Domain"})
      }
    })
  }

  sendMessage = (content, options) => {
    let opts = {};
    opts.content = content? content : "No Content";
    if (options) {
      Object.entries(options).forEach(e => {
        if (e[0] !== "content") {
          opts[e[0]] = e[1]
        }
      })
    }
    
    return sendUnrestricted(opts)
  }  

  sendEmbed = (...embeds) => {
    if (embeds.length > 0) {
      return sendUnrestricted({embeds: embeds})
    }
  }

})();
