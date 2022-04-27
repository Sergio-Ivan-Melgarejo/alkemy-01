function createMarkup(code) {
    return {__html: code};
}
  
function Description({code}) {
    return <div dangerouslySetInnerHTML={createMarkup(code)} />;
}

export default Description