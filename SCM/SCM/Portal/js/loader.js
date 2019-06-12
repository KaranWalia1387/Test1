var loader = {
    showloader: function () {
        try {
            document.getElementById('page_loader').style.display = 'block';
        }
        catch (e)
        {
            console.log(e.message);
        }
        
    },
    hideloader: function () {
        try {
            document.getElementById('page_loader').style.display = 'none';
        }
        catch (e)
        {
            console.log(e.message);
        }
    }

   

}

