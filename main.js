
const productsQuant = document.querySelector('#products-quant')
const productsNum = document.querySelector('#products-num')
const productsSell = document.querySelector('#products-sell')
const revenu = document.querySelector('#revenu')
const outOfStock = document.querySelector('.out-stock')
//=====================================Profile page
const storeName = document.querySelector("#saved-name")
const img = document.querySelector("#profile")
const logo = document.querySelector("#sidebar-logo")
const nameInput = document.querySelector('#store-name')
const imgInput = document.querySelector('#store-pic')
const outStockInput = document.querySelector('#out-stock-input')
const refresh = document.querySelector('#refresh')
const savePrf = document.querySelector('#save')
const ignore = document.querySelector('#ignore')
const outSpan = document.querySelector('#out')
let store =  JSON.parse(localStorage.getItem('storeName')) || null
let storePic = JSON.parse(localStorage.getItem('storePic')) || null
let setOut = JSON.parse(localStorage.getItem('setOut')) || 0
storeName.innerHTML = store;
img.src = `images/products/${storePic}`
logo.src = `images/products/${storePic}`
outSpan.innerHTML = setOut
nameInput.value = store
img.value = storePic
outStockInput.value = setOut
function saveProfile(){
    store = nameInput.value
    storePic = imgInput.files[0].name
    setOut = outStockInput.value
    storeName.innerHTML = store;
    img.src = `images/products/${storePic}`
    logo.src = `images/products/${storePic}`
    outSpan.innerHTML = setOut
    localStorage.setItem('storeName', JSON.stringify(store))
    localStorage.setItem('storePic', JSON.stringify(storePic))
    localStorage.setItem('setOut', JSON.stringify(setOut))

}
//============================================SIDE BAR 
let tabs = document.querySelectorAll('.tab-btn')
let all_content = document.querySelectorAll('.content')
tabs[0].classList.add('active')
all_content[0].classList.add('active')
tabs.forEach((tab, index)=>{
    tab.addEventListener('click', (e)=>{
        tabs.forEach(tab => {
            tab.classList.remove('active')
        })
        tab.classList.add('active')
        all_content.forEach(content => {
            content.classList.remove('active')
        })
        all_content[index].classList.add('active')
    })

})

//=============================================NOTIFICATIONS
let toastBox = document.querySelector('#toastBox')
let successMsg = '<img src="images/icons/success.svg" alt=""> .تمت إضافة المنتج بنجاح'
let updateMsg = '<img src="images/icons/success.svg" alt=""> . تمت تحديث البيانات بنجاح  '
let sellMsg = '<img src="images/icons/success.svg" alt=""> تمت عملية البيع بنجاح.'
let deleteMsg = '<img src="images/icons/error.svg" alt=""> تم مسح المنتج.'
let cleanMsg = '<img src="images/icons/error.svg" alt=""> .تم مسح جميع المنتجات'
let errorMsg = '<img src="images/icons/error.svg" alt=""> Please fix the error!'
let invalidMsg = '<img src="images/icons/invalid.svg" alt=""> المرجو ملأ الخانات الأساسية.'
function showToast(msg){
    let toast = document.createElement('div');
    toast.classList.add('toast')
    toast.innerHTML = msg;
    toastBox.appendChild(toast)
    if(msg.includes('مسح')){
        toast.classList.add('error')
    }
     if(msg.includes('ملأ')){
        toast.classList.add('invalid')
    } 
    setTimeout(()=>{
        toast.remove()
    }, 6000)
}
//==============================================DARK MODE (redo)
// Select the checkbox input
const darkModeToggle = document.getElementById('dark-mode-toggle');
const sidebar = document.querySelector('nav')
const inputs = document.querySelectorAll('input')
const charts = document.querySelectorAll('.chart')
const cards = document.querySelectorAll('.card')

// Add event listener to toggle dark mode
darkModeToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
    sidebar.classList.toggle('dark-mode')

    inputs.forEach(input => {
        input.classList.toggle('dark-mode')
    })
    charts.forEach(chart => {
        chart.classList.toggle('dark-mode')
    })
    cards.forEach(card => {
        card.classList.toggle('dark-mode')
    })
});

//============================================== ADD PRODUCT
let mode = "create";
let tmp;
let value;
const title = document.querySelector('#title')
const price = document.querySelector('#price')
const taxes = document.querySelector('#taxes')
const image = document.querySelector("#imageUpload")
const ads = document.querySelector('#ads')
const discount = document.querySelector('#discount')
const total = document.querySelector('#total')
const quant = document.querySelector('#count')
const submit = document.querySelector('#submit')
const category = document.querySelector('#category')
const choise = document.querySelector('#choice')
//console.log(title, price, ads, discount, total, count, submit, category)
//get total
function getTotal(){
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value ) - +discount.value
        total.innerHTML = result;
        total.style.background = '#040'
    }else{
        total.innerHTML=''
        total.style.background = 'red'

    }
}
//let dataPro = JSON.parse(localStorage.product) || []
let categorySuggestion = JSON.parse(localStorage.getItem('categories')) || []

let dataPro = JSON.parse(localStorage.getItem('products')) || []

let sell = JSON.parse(localStorage.getItem('sell')) || 0
productsSell.innerHTML = sell

let revenuMAD = JSON.parse(localStorage.getItem('revenu')) || 0
revenu.innerHTML = revenuMAD

showData() 

//autocomplete for category

const resultBox = document.querySelector('.result-box')
category.onkeyup = function(){
    let result = []
    let input = category.value
    if(input.length){
        result = categorySuggestion.filter((keyword)=> {
            return keyword.toLowerCase().includes(input.toLowerCase());
        });
    }
    display(result)
}
function display(result){
    const content = result.map((list)=>{
        return "<li onclick='selectInput(this)'>" + list + "</li>";
    });
    resultBox.innerHTML = "<ul>"+ content.join('') + "</ul>";
}

function selectInput(list){
    category.value = list.innerHTML;
    resultBox.innerHTML = ''
}
//============================================OUT OF STOCK
function out(){
    for(let i of dataPro){
        if(Number(i.quant) <= setOut){
            outOfStock.innerHTML = `
             <button onclick="outProducts()" class="outOfStock"  style= " background-color: rgb(240, 113, 113); margin-top: 10px;">مخزون فارغ</button>
             <button onclick="deleteOut()" class="outOfStock"  style= " background-color: rgb(240, 113, 113); margin-top: 10px;"> حذف المخزون الفارغ</button>
             <button onclick="showData()" class="outOfStock"  style= "  margin-top: 10px;">جميع المنتجات </button>

            `
        }
    }
}
out()
function deleteOut(){
    for(let i =0; i< dataPro.length; i++){
        if(Number(dataPro[i].quant) <= setOut){
            deleteData(i)
        }}
}
function outProducts(){
    let table = '';
    for(let i =0; i< dataPro.length; i++){
        if(Number(dataPro[i].quant) <= setOut){
                table +=`
                            <tr style=" border: 1px solid gray;">
                                    <td>${i+1}</td>
                                    <td>  <img src="images/products/${dataPro[i].image}" alt="" style="width: 60px; height: 60px ;border-radius:50% ;">  </td>
                                    <td>${dataPro[i].title}</td>
                                    <td>${dataPro[i].price}</td>
                                    <td>${dataPro[i].ads}</td>
                                    <td>${dataPro[i].discount}</td>
                                    <td>${dataPro[i].total}</td>
                                    <td>${dataPro[i].quant} </td>
                                    <td>${dataPro[i].category}</td>
                                    <td>${dataPro[i].date}</td>
                                    <td><button class="table-btn" onclick="update(${i})" >تحديث</button></td>
                                    <td><button  class="table-btn" popovertarget="delete-${i}" >مسح</button></td>
                                    
                                    <div popover   id="delete-${i}" style="border: 1px solid black; border-radius: 10px; padding: 20px 30px; position: absolute; top: 50%; right: 50%; transform: translate(50%, -50%);" >
                                    <p>هل تريد مسح المنتج ${dataPro[i].title}؟ </p>
                                    <button onclick="deleteData(${i})" style="background: #b479cb; border: 1px solid purple; margin-bottom: 20px; margin-top: 20px;" >نعم  </button>
                                    <button > لا</button>
                                    </div>
        
                            </tr>
                `
            document.querySelector('#tbody').innerHTML = table;
        }
    }

}
//creat product

submit.onclick = function(){
   let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        ads: ads.value,
        taxes: taxes.value,
        discount: discount.value,
        total: total.innerHTML,
        category: category.value.toLowerCase(),
        quant: quant.value,
      // image: image.files[0].name,
        image:  'phone.png',
        //date: new Date().toLocaleString()
        date: new Date().toISOString()
        }
        resultBox.innerHTML = ''
        
         if(image.value !=''){ //redo
             newPro = {
                title: title.value.toLowerCase(),
                price: price.value,
                ads: ads.value,
                taxes: taxes.value,
                discount: discount.value,
                total: total.innerHTML,
                category: category.value.toLowerCase(),
                quant: quant.value,
                image: image.files[0].name,
                date: new Date().toLocaleString()
                }
        } 
        if(title.value != '' && price.value != '' && category.value !='' && count.value < 500){
            if(mode === 'create'){
                if (!categorySuggestion.includes(newPro.category)) {
                    categorySuggestion.push(newPro.category);
                }                
            dataPro.push(newPro)
            showToast(successMsg)
            }else{
                if (!categorySuggestion.includes(newPro.category)) {
                    categorySuggestion.push(newPro.category);
                }                
                dataPro[tmp] = newPro;
                mode = "create";
                submit.innerHTML= "إضافة";
                count.style.display= "block";
                scroll({
                    top: value,
                    behavior: "smooth"
                })
                showToast(updateMsg)

            }
                }
                //save data in localstorage
                localStorage.setItem('products', JSON.stringify(dataPro))
                localStorage.setItem('categories', JSON.stringify(categorySuggestion))

                clearData()
                showData()
                out()
                total.style.background = 'red'
    }


//clear inputs
function clearData(){
    title.value ='';
    price.value = '';
    taxes.value ='';
    total.innerHTML ='';
    ads.value ='';
    quant.value ='';
    category.value ='';
    discount.value ='';
    image.value ='';
}
//read

function showData(){
    let table = '';
    for(let i =0; i< dataPro.length; i++){
        table +=`
                    <tr style=" border: 1px solid gray;">
                            <td>${i+1}</td>
                            <td>  <img src="images/products/${dataPro[i].image}" alt="" style="width: 60px; height: 60px ;border-radius:50% ;">  </td>
                            <td>${dataPro[i].title}</td>
                            <td>${dataPro[i].price}</td>
                            <td>${dataPro[i].ads}</td>
                            <td>${dataPro[i].discount}</td>
                            <td>${dataPro[i].total}</td>
                            <td>${dataPro[i].quant} </td>
                            <td>${dataPro[i].category}</td>
                            <td>${dataPro[i].date}</td>
                            <td><button class="table-btn" onclick="update(${i})" >تحديث</button></td>
                            <td><button  class="table-btn" popovertarget="delete-${i}" >مسح</button></td>
                            
                            <div popover   id="delete-${i}" style="border: 1px solid black; border-radius: 10px; padding: 20px 30px; position: absolute; top: 50%; right: 50%; transform: translate(50%, -50%);" >
                            <p>هل تريد مسح المنتج ${dataPro[i].title}؟ </p>
                            <button onclick="deleteData(${i})" style="background: #b479cb; border: 1px solid purple; margin-bottom: 20px; margin-top: 20px;" >نعم  </button>
                            <button > لا</button>
                            </div>

                    </tr>
        `
    }
    document.querySelector('#tbody').innerHTML = table;
    const deleteBtn = document.querySelector('.delete-all')

    if(dataPro.length>0){
        deleteBtn.innerHTML = `
        <button class="table-btn"    popovertarget="deleteALL" style= "margin-top: 10px;">مسح جميع المنتجات (${dataPro.length})</button>
               <div popover   id="deleteALL" style="border: 1px solid black; border-radius: 10px; padding: 20px 30px; position: absolute; top: 50%; right: 50%; transform: translate(50%, -50%);" >
        <p>هل تريد مسح جميع المنتجات؟ </p>
        <button class="table-btn"  onclick="cleanData()" style="background: #b479cb; border: 1px solid purple; margin-bottom: 20px; margin-top: 20px;" >نعم  </button>
        <button > (المرجو الضغط على الشاشة ) لا </button>
        </div>
`
    } else{
        deleteBtn.innerHTML='';
    }
    //allProducts()
    totalQuant()
    productNum()
    out()
}

//delete

function deleteData(i){
    dataPro.splice(i,1)
   // localStorage.product = JSON.stringify(dataPro)
   localStorage.setItem('products', JSON.stringify(dataPro))

    showData()
    showToast(deleteMsg)
}

function cleanData(){
  //  localStorage.clear();
    dataPro = []
    //dataPro.splice(0)
    localStorage.setItem('products', JSON.stringify(dataPro))

    showData()
    showToast(cleanMsg)
}
//update
function update(i){
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    category.value = dataPro[i].category;
    quant.value = dataPro[i].quant;
    submit.innerHTML= 'تحديث'
    getTotal()
    mode = "update";
    tmp = i;
    value = window.scrollY
    scroll({
        top:0,
        behavior: "smooth"
    })
}
//search
let searchMood = 'Title';
const search = document.querySelector('#search')



function getSearchMod(id){
    if(id == 'searchTitle'){
        searchMood = 'Title';
        search.placeholder = 'بحث من خلال الإسم'
    }else{
        searchMood = 'Category'
        search.placeholder = 'بحث من خلال الصنف'
    }

    search.focus()
    search.value =''
    if(search.value === ''){
        showData()
    }
}

function searchData(value){
    let table;
    for(let i =0; i < dataPro.length; i++){
        if(searchMood == 'Title'){

            if(dataPro[i].title.includes(value.toLowerCase())){
                table +=`
                    <tr style=" border: 1px solid gray;">
                            <td>${i+1}</td>
                            <td>  <img src="images/products/${dataPro[i].image}" alt="" style="width: 60px; height: 60px ;border-radius:50% ;">  </td>
                            <td>${dataPro[i].title}</td>
                            <td>${dataPro[i].price}</td>
                            <td>${dataPro[i].ads}</td>
                            <td>${dataPro[i].discount}</td>
                            <td>${dataPro[i].total}</td>
                            <td>${dataPro[i].quant} </td>
                            <td>${dataPro[i].category}</td>
                            <td><button class="table-btn" onclick="update(${i})" >تحديث</button></td>
                            <td><button  class="table-btn" popovertarget="delete-${i}" >مسح</button></td>
                            
                            <div popover   id="delete-${i}" style="border: 1px solid black; border-radius: 10px; padding: 20px 30px; position: absolute; top: 50%; right: 50%; transform: translate(50%, -50%);" >
                            <p>هل تريد مسح المنتج ${dataPro[i].title}؟ </p>
                            <button onclick="deleteData(${i})" style="background: #b479cb; border: 1px solid purple; margin-bottom: 20px; margin-top: 20px;" >نعم  </button>
                            <button > لا</button>
                            </div>
                    </tr>
`
            }


    }else{
            if(dataPro[i].category.includes(value.toLowerCase())){
                table +=`
                    <tr style=" border: 1px solid gray;">
                            <td>${i+1}</td>
                            <td>  <img src="images/products/${dataPro[i].image}" alt="" style="width: 60px; height: 60px ;border-radius:50% ;">  </td>
                            <td>${dataPro[i].title}</td>
                            <td>${dataPro[i].price}</td>
                            <td>${dataPro[i].ads}</td>
                            <td>${dataPro[i].discount}</td>
                            <td>${dataPro[i].total}</td>
                            <td>${dataPro[i].quant} </td>
                            <td>${dataPro[i].category}</td>
                            <td><button class="table-btn" onclick="update(${i})" >تحديث</button></td>
                            <td><button  class="table-btn" popovertarget="delete-${i}" >مسح</button></td>
                            
                            <div popover   id="delete-${i}" style="border: 1px solid black; border-radius: 10px; padding: 20px 30px; position: absolute; top: 50%; right: 50%; transform: translate(50%, -50%);" >
                            <p>هل تريد مسح المنتج ${dataPro[i].title}؟ </p>
                            <button onclick="deleteData(${i})" style="background: #b479cb; border: 1px solid purple; margin-bottom: 20px; margin-top: 20px;" >نعم  </button>
                            <button > لا</button>
                            </div>
                    </tr>
`
            }
    }
    }
    document.querySelector('#tbody').innerHTML = table;

}

//=============================================================================================SELL
const productSell = document.querySelector('#productId');
const quantSell = document.querySelector('#quantSell')
const card = document.querySelector('.productCard')
function sellDone(){
    sell = sell + Number(quantSell.value)
    localStorage.setItem('sell', JSON.stringify(sell))
    productsSell.innerHTML = sell
    card.innerHTML = ""
    for(i=0; i < dataPro.length; i++){
        if(i+1 == productSell.value){
            newPro = {
                title: dataPro[i].title,
                price: dataPro[i].price,
                ads: dataPro[i].ads,
                taxes: dataPro[i].taxes,
                discount: dataPro[i].discount,
                total: dataPro[i].total,
                category: dataPro[i].category,
                image: dataPro[i].image,
                quant: Number(dataPro[i].quant) - Number(quantSell.value),
                }
                revenuMAD = revenuMAD + (Number(newPro.total) * Number(quantSell.value))
                localStorage.setItem('revenu', JSON.stringify(revenuMAD))
                revenu.innerHTML = revenuMAD

                dataPro[i] = newPro;
                localStorage.setItem('products', JSON.stringify(dataPro))
                showData()
                


            card.innerHTML = `
                <img src="images/products/${dataPro[i].image}" alt="">
                <div class="info">
                    <p> رقم المنتج <span>${i+1}</span></p>
                    <p> اسم المنتج  <span>${dataPro[i].title}</span> </p>
                    <p> الصنف <span> ${dataPro[i].category} </span></p>
                    <p> الكمية <span>${dataPro[i].quant}</span></p>
                    <p> المجموع<span>${dataPro[i].total}</span></p>
                </div>
            `
            break

        }else{
            card.innerHTML = `
            رقم المنتج غير صحيح, المرجو التأكد منه وإعادة المحاولة.شكرا!
            `
        }
    }
    out()
}

//============================================================================ALL PRODUCT
/*allProducts()

function allProducts(){
    document.querySelector('.container-cards').innerHTML = ""
for(let i = 0; i<dataPro.length; i++){
    document.querySelector('.container-cards').innerHTML += `
                    <div class="card">
                    <div class="product-image">
                        <img src="images/products/${dataPro[i].image}" alt="">
                    </div>
                    <div class="product-info">
                        <h4>${i + 1}</h4>
                        <h4>${dataPro[i].title}</h4>
                        <h4>${dataPro[i].category}</h4>
                        <h4>${dataPro[i].total} </h4>
                        <h4>${dataPro[i].quant} </h4>
                    </div>
                    <div class="btn-card">
                        <button>تعديل</button>
                    </div>
                </div>
`
}
}
function productCard(i){
    console.log(i)
}*/
//=================================================================REPORT

function totalQuant(){
    let prodQuant = []
    for(let product of dataPro){
        prodQuant.push(Number(product.quant))
    }
    let totalQuant = prodQuant.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    
    productsQuant.innerHTML = totalQuant
}
totalQuant()
function productNum(){
    let productNum = dataPro.length;
    productsNum.innerHTML = productNum
}
productNum()
//===========================================================CONVERT DATA TO SHEET
// Import SheetJS (if using module bundler)

// Function to download array as Excel
function downloadExcel() {
    // Convert data to worksheet
    const worksheet = XLSX.utils.json_to_sheet(dataPro);

    // Create workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Products");

    // Generate Excel file and trigger download
    XLSX.writeFile(workbook, "data.xlsx");
}


window.onload = function () {
    function downloadExcel() {
        // Sample data


        // Check if XLSX is available
        if (typeof XLSX === "undefined") {
            console.error("SheetJS (XLSX) library not loaded!");
            return;
        }

        // Convert data to worksheet
        const worksheet = XLSX.utils.json_to_sheet(dataPro);

        // Create a new workbook
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

        // Write file and trigger download
        XLSX.writeFile(workbook, "data.xlsx");
    }

    // Attach function to the button
    document.querySelector("#download").addEventListener("click", downloadExcel);
};




