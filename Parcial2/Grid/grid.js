
// new gridjs.Grid({
//     columns: ["Name", "Email", "Phone Number"],
//     data: [
//         ["John", "john@example.com", "(353) 01 222 3333"],
//         ["Mark", "mark@gmail.com", "(01) 22 888 4444"],
//         ["Eoin", "eoin@gmail.com", "0097 22 654 00033"],
//         ["Sarah", "sarahcdd@gmail.com", "+322 876 1233"],
//         ["Afshin", "afshin@mail.com", "(353) 22 87 8356"]
//     ]
// }).render(document.getElementById("wrapper"));

new gridjs.Grid({
    columns: ['ID', 'Nombre', 'Apellido','Email'],
    server: {
        url: 'http://localhost:8086/consultar/*',
        then: data => data.map(x =>
            [x.id_empleado, x.nombre, x.apellido, x.email]
        )
    },
    sort:true,
    search:{
        enable:true
    },
    pagination:{
        enable:true,
        limit:6,
        summary: false
    },
    width:'75%',
    style:{
        td:{
            border:'1px '
        },
        table:{
            'width':'100%',
            
        }
    }
}).render(document.getElementById("wrapper"));