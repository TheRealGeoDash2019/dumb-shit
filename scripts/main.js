(async () => {
  console.log(localStorage.token.replaceAll("\"", "").split(".").map((tokenPart, index) => {if (index > 1) return tokenPart.split("").map(char => "*").join(""); else return tokenPart;}).filter(tokenPart => tokenPart != null).join("."));
})();
