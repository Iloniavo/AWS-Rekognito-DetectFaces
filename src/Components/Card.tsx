import React, {useState, useEffect} from 'react'
import { Markup } from 'interweave'

export default function Card(props: any) {
  const [key, setKey] = useState<any>()
  const [value, setValue] = useState<any[]>([])
  let dat = props

  const parse = (table: any) => {
      let cle = Object.keys(table);
      let out = "<p>"
      for(let one of cle){
      out+=`\n<p>${one} :${table[one]}</p>\n`
    }
  return out+="</ul>"
  }
  
  const tpr = (data: any)=>{
  let tableKey = []
  let tableValue = []
  let index = Object.keys(data[0])
  for(let item of index){
      if(typeof(data[0][item]) == 'number'){
       //' if()
        tableKey.push(item)
        tableValue.push((data[0][item]));
     }else if(data[0][item].length){
      tableKey.push(item)
      let ok = ""
          for(let i=0; i<data[0][item].length; i++){
              ok += (parse(data[0][item][i]))
          } 
       tableValue.push(ok)
      }else{
        tableKey.push(item)
          tableValue.push(parse((data[0][item])));
      }
  }
  setKey(tableKey);
  setValue(tableValue)
  }

useEffect(()=>{
  if(dat){
    tpr(dat.datas);
  }
},[])

  return (
    <>
    <div className='tabble'>
      <table className='table table-hover'>
          <thead></thead>
        <tbody>
      {value.map((elt: any, idx:number)=>(
         <tr key={idx} className='line'>
            <td className='key' style={
                {
                    fontWeight: "normal",
                   paddingTop: "5%",
                    borderBottom: "solid 1px whitesmoke"
                }}>
                  <Markup content={key[idx]} /> :</td>
            <td className='value' style={{
              paddingTop: '5%'
            }}><Markup content={(elt).toString()}/></td>
          </tr>
      ))}
      </tbody>
        </table>
    </div>
    </>
  )
}
