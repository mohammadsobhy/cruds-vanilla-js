    // get elements
    let title = document.getElementById('title');
    let price = document.getElementById('price');
    let taxes = document.getElementById('taxes');
    let ads = document.getElementById('ads');
    let discount = document.getElementById('discount');
    let total = document.getElementById('total');
    let count = document.getElementById('count');
    let category = document.getElementById('category');
    let submit = document.getElementById('submit');
    let search = document.getElementById('search')

    let mood = 'create';
    let tmp;



    // get total
    function getTotal() {
        if (price.value != '') {

            // create new variable to get the total (becareful about the (+) sign)
            let result = (+price.value + +taxes.value + +ads.value) - +discount.value

            //put the result in the html
            total.innerHTML = result;

            // change the styles when the user put any value in the price only
            total.style.backgroundColor = "#1a9b30"

        } else {
            // empty the total if there is no value
            total.innerHTML = '';

            // noooooo change the styles when the user put any value in the price only
            total.style.backgroundColor = "#8b0909"

        }



    }

    // create product
    // create middlware array called datapro for saving data coming from the newPro use it for save these data in the localstorage and show it on html

    let dataPro = [];

    //check if the localstorage is empty or no
    // change the localstorage from string to array again by using the parse method
    if (localStorage.product != null) {
        dataPro = JSON.parse(localStorage.product)
    } else {
        dataPro = [];
    }


    submit.onclick = function () {


        //create new array to get the values from the inputs and pass it to the dataPro
        let newPro ={
            title: title.value.toLowerCase(),
            price: price.value,
            taxes: taxes.value,
            ads: ads.value,
            discount: discount.value,
            total: total.innerHTML,
            count: count.value,
            category: category.value.toLowerCase()
        }

        // add new item to our middleware array dataPro and count for the items
        if (title.value != '' && price.value != '' && category.value != '' && newPro.count < 100) {
            if (mood === 'create') {
                if (newPro.count > 1) {

                    for (let i = 0; i < newPro.count; i++) {
                        dataPro.push(newPro)

                    }

                } else {
                    dataPro.push(newPro)
                }

            } else {
                dataPro[tmp] = newPro;
                mood = "create"
                count.style.display = "block";
                submit.innerHTML = "Create"

            }
            clearData();

        } else {

        }





        // save the new and old items in the localstorage
        // here we use the JSON.stringify(dataPro) because it must be as a string
        localStorage.setItem("product", JSON.stringify(dataPro))
        //for test
        //console.log(dataPro);


        showData()
    }

    // clear inputs
    function clearData() {
        title.value ='',
        price.value = '',
        taxes.value = '',
        ads.value = '',
        discount.value = '',
        total.innerHTML = '',
        count.value = '',
        category.value = ''


    }

    // read
    function showData() {

        getTotal()

        let table ='';

        for (let i = 0; i < dataPro.length; i++) {
           table += `
        <tr>
            <th>${i + 1}</th>
            <th>${dataPro[i].title}</th>
            <th>${dataPro[i].price}</th>
            <th>${dataPro[i].taxes}</th>
            <th>${dataPro[i].ads}</th>
            <th>${dataPro[i].discount}</th>
            <th>${dataPro[i].total}</th>
            <th>${dataPro[i].category}</th>
            <th><button onclick="updateData(${i})">update</button></th>
            <th><button onclick="deleteData(${i})">delete</button></th>
        </tr>

        `;

        }

        document.getElementById('tbody').innerHTML = table;

        let btnDelete = document.getElementById('deleteAll')
        if (dataPro.length > 0) {

            btnDelete.innerHTML = `
                <button onclick="deleteAll()">Delete All Products (${dataPro.length})</button>
            `

        } else {
            btnDelete.innerHTML = ''
        }



    }
    showData()
    // count
    // delete
        // delete one item
    let i;
    function deleteData(i) {
         dataPro.splice(i, 1)
         localStorage.product = JSON.stringify(dataPro)
         showData()
    }
        //delete all items
    function deleteAll() {
        localStorage.clear()
        dataPro.splice(0)
        showData()
    }
    // update
   function updateData(i) {
        title.value = dataPro[i].title;
        price.value = dataPro[i].price;
        taxes.value = dataPro[i].taxes;
        ads.value = dataPro[i].ads;
        discount.value = dataPro[i].discount;
        category.value = dataPro[i].category;
        getTotal();
        submit.innerHTML = "Update";
        count.style.display = "none";
        mood = "update";
        tmp = i;
        scroll({
            top: 0,
            behavior: "smooth"
        })

        showData()

   }
    // search
   let searchMood = "title";

   function getSearchMood(id) {


        if (id === 'searchTitle') {
            searchMood = "Title";


        } else {
            searchMood = "Category";


        }

        search.placeholder = "Search By " + searchMood;
        search.focus();
        search.value = '';
        showData()

   }

   function searchData(value) {

    let table ='';

    if (searchMood == 'title') {
        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].title.includes(value.toLowerCase())) {
                table += `
                <tr>
                    <th>${i + 1}</th>
                    <th>${dataPro[i].title}</th>
                    <th>${dataPro[i].price}</th>
                    <th>${dataPro[i].taxes}</th>
                    <th>${dataPro[i].ads}</th>
                    <th>${dataPro[i].discount}</th>
                    <th>${dataPro[i].total}</th>
                    <th>${dataPro[i].category}</th>
                    <th><button onclick="updateData(${i})">update</button></th>
                    <th><button onclick="deleteData(${i})">delete</button></th>
                </tr>

                `;

            }


        }

    } else {
        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].category.includes(value)) {
                table += `
                <tr>
                    <th>${i + 1}</th>
                    <th>${dataPro[i].title}</th>
                    <th>${dataPro[i].price}</th>
                    <th>${dataPro[i].taxes}</th>
                    <th>${dataPro[i].ads}</th>
                    <th>${dataPro[i].discount}</th>
                    <th>${dataPro[i].total}</th>
                    <th>${dataPro[i].category}</th>
                    <th><button onclick="updateData(${i})">update</button></th>
                    <th><button onclick="deleteData(${i})">delete</button></th>
                </tr>

                `;

            }


        }

    }
    document.getElementById('tbody').innerHTML = table;

   }







    // clean data
