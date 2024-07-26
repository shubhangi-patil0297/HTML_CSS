const table = document.getElementById('sortTable');
const headers = table.querySelectorAll('th');
const rows = table.querySelectorAll('tr');

headers.forEach((header,headerIndex)=>{
    header.addEventListener('click',()=>{
        sortColumn(headerIndex);
    });
});

// Transform the content of given cell in given column
const transform = function (index, content) {
    // Get the data type of column
    const type = headers[index].getAttribute('type');
    switch (type) {
        case 'number':
            return parseFloat(content);
        case 'string':
        default:
            return content;
    }
};

// Track sort directions
let directions = Array(headers.length).fill("");
console.log(directions);

function sortColumn(headerIndex){
    
    //Check the direction asc or desc
    const direction = directions[headerIndex] || 'asc';
    const multiplier = (direction=='asc')? 1 :-1;
    changeIcon(direction,headerIndex);
    //lets make new instance of rows
    let arrayRows = Array.from(rows);      
    arrayRows.shift();//Exclude header
    
    let newRows = Array.from(arrayRows);
    newRows.sort(function(rowA,rowB){
        //Get the content of cells
        const cellA = rowA.querySelectorAll('td')[headerIndex].innerHTML;
        const cellB = rowB.querySelectorAll('td')[headerIndex].innerHTML;
        let a = transform(headerIndex,cellA);        
        let b = transform(headerIndex,cellB);        

        if(a>b)
            return 1*multiplier;
        else if(a<b)
            return -1*multiplier;
        else
            return 0;
    });    
     //Remove old rows
     let tbody = document.getElementsByTagName("tbody");
     rows.forEach((row,index)=>{
        if(index!=0)
            tbody[0].removeChild(row);
     });
     //Append new row
     newRows.forEach((newRow)=>{
         tbody[0].appendChild(newRow);
     });

     // Reverse the direction
    directions[headerIndex] = direction === 'asc' ? 'desc' : 'asc';
    // console.log(directions);
}
function changeIcon(direction,index)
{
    // inactive all icons
    for(let i=0;i<headers.length;i++){
        headers[i].childNodes[1].className='';//Removing all classes
    }
    
    let className;
    if(direction=="desc")
    {
        //headers[index].childNodes[1].classList.add('fa-solid','fa-caret-down','active');
        headers[index].childNodes[1].className = ('fa-solid fa-caret-down active');
    }else{
        //headers[index].childNodes[1].classList.add('fa-solid','fa-caret-up','active');
        headers[index].childNodes[1].className = ('fa-solid fa-caret-up active');
    }    
}
// How sort function works:
// arr = ['3', '1', 4, 1, 5, 9];
// function compareFun(a,b){
//  if(a>b) 
// 	{
// 	    return 1; //Place a after b
// 	}
// 	else if(a<b) 
// 	{
// 		return -1;//Place a before b
// 	}
// 	else 
// 		return 0;//Don' change the position keep original order
// }
// arr.sort(compareFun);