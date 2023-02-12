import formidable from "formidable";

export default function readForm(handler) {  
  return async(req, res) => {
    console.log('begin read form')
    const form = formidable({multiples: true})
    form.parse(req, (err, fields, files) => {
      if(err) {
        console.log(error)
        res.writeHead(err.httpCode || 400, { 'Content-Type': 'text/plain' });
        res.end(String(err));
        return;
      }else{
        req.fields = fields
        req.files = files
        return handler(req, res);
      }      
    })
  }  
}