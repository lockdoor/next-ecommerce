import { update, remove, read } from "@/database/product"
import isAdmin from "@/middleware/isAdmin"
import readForm from "@/middleware/readForm"
export default async function handler (req, res){
  switch(req.method){
    case 'PUT': 
      console.log('update put')
      isAdmin(readForm(update))(req, res)
      break
    case 'DELETE': 
      isAdmin(remove)(req, res)
      break
    case 'GET': 
      read(req, res)
      break
    default: res.status(405).json({error: `method ${req.method} not allow`})
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};