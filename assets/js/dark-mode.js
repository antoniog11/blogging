document.addEventListener('turbolinks:load', themeChange);

function themeChange(){
    // Select our toggle button
    let button = document.querySelector('.theme-toggle');
    console.log(button.innerHTML)
    // Add an event listener for a click
    button.addEventListener('click', function(e){
        // Check the current data-theme value
        let currentTheme = document.documentElement.getAttribute('data-theme');
        if(currentTheme === 'light') {
            transition();
            document.documentElement.setAttribute('data-theme', 'dark');
            button.innerHTML = "Light Mode"
        } else {
            transition();
            document.documentElement.setAttribute('data-theme','light');
            button.innerHTML = "Dark Mode"
        }
    });

    // Adds the 'transition' class to <html> for CSS fun
    let transition = () =>{
        document.documentElement.classList.add('transition');
        window.setTimeout(()=>{
            document.documentElement.classList.remove('transition');
        }, 1000);
    }
}