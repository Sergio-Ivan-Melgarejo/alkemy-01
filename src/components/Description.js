function createMarkup(code) {
    return {__html: code};
}
  
function Description({code}) {
    return <div className="p-3 text-secondary" dangerouslySetInnerHTML={createMarkup(code)} />;
}

export default Description