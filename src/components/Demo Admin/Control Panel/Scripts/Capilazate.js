const capitalize = (str, lower = false) =>
        (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase());  /* CREDITS: https://stackoverflow.com/a/7592235*/
    
export default capitalize