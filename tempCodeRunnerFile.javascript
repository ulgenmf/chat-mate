



function furkan({ a, b }) {
  const c =a+b
  return c
}

const furkanPro = new Promise(function (resolve, eject) {
  const a= furkan(10, 20)
  
  return a
  
})


furkanPro.then(console.log(furkanPro))