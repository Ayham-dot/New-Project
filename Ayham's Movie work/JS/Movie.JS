$(document).ready(function() {
    // Movie data
    var movies = [
        {title: "Die Hard", rating: 8.2, image: "https://m.media-amazon.com/images/M/MV5BZjRlNDUxZjAtOGQ4OC00OTNlLTgxNmQtYTBmMDgwZmNmNjkxXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg", category: 'Action'},
        {title: "Mad Max", rating: 7.4, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZMHutSyGUQQUzRUkN5qe8TOb3J0Nhzw2Smw&s", category: 'Action'},
        {title: "John Wick", rating: 8.1, image: "https://m.media-amazon.com/images/M/MV5BMTU2NjA1ODgzMF5BMl5BanBnXkFtZTgwMTM2MTI4MjE@._V1_.jpg", category: 'Action'},
        {title: "Blade Runner 2049",rating:8.0,image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNlbNtH-VUeLeM-M7bcZZAm2P3CBd1d3sXIA&s",category: "Sci-Fiction"},
        {title: "Interstellar", rating: 8.7, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0zt0lp-O3XdL8zzdrEvyzmcl6kOwfgbv4xQ&s", category: 'Sci-Fiction'},
        {title: "The Matrix", rating: 8.3, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfSjSWOCaw5dnDL2GT1zFd9RMCgUGw5Q2Cfg&s", category: 'Sci-Fiction'},
        {title: "Superbad", rating: 7.6, image: "https://m.media-amazon.com/images/M/MV5BY2VkMDg4ZTYtN2M3Yy00NWZiLWE2ODEtZjU5MjZkYWNkNGIzXkEyXkFqcGdeQXVyODY5Njk4Njc@._V1_FMjpg_UX1000_.jpg", category: 'Comedy'},
        {title: "Step Brothers", rating: 6.9, image: "https://m.media-amazon.com/images/M/MV5BODViZDg3ZjYtMzhiYS00YTVkLTk4MzktYWUxMTlkYjc1NjdlXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg", category: 'Comedy'},
        {title: "The Hangover", rating: 7.7, image: "https://m.media-amazon.com/images/M/MV5BNGQwZjg5YmYtY2VkNC00NzliLTljYTctNzI5NmU3MjE2ODQzXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg", category: 'Comedy'},
        {title: "Toy Story", rating: 8.4, image: "https://m.media-amazon.com/images/M/MV5BMDU2ZWJlMjktMTRhMy00ZTA5LWEzNDgtYmNmZTEwZTViZWJkXkEyXkFqcGdeQXVyNDQ2OTk4MzI@._V1_.jpg", category: 'Animated'},
        {title: "Finding Nemo", rating: 8.6, image: "https://m.media-amazon.com/images/M/MV5BMTc5NjExNTA5OV5BMl5BanBnXkFtZTYwMTQ0ODY2._V1_QL75_UX190_CR0,0,190,281_.jpg", category: 'Animated'},
        {title: "The Incredibles", rating: 8.4, image: "https://lumiere-a.akamaihd.net/v1/images/p_theincredibles_19751_52f1f47a.jpeg?region=0%2C0%2C540%2C810", category: 'Animated'}
    ];

    // Function to render movies
    function renderMovies(movieList) {
        $('#movie-list').empty() // Clear existing movies
        for (let i = 0; i < movieList.length; i++) {
            const movie = movieList[i]
            const box = $('<div>').addClass('movie-box')
            $('<img>').prop('src', movie.image).appendTo(box)
            $('<h2>').text(movie.title).appendTo(box)
            $('<p>').text('Rating: ' + movie.rating).appendTo(box)
            const button = $('<button>').text('Add to Favorites')
            button.on('click', function() {
                const currentText = $(this).text()
                if (currentText === 'Add to Favorites') {
                    $(this).text('Remove from Favorites')
                } else {
                    $(this).text('Add to Favorites')
                }
            });
            button.appendTo(box)
            $('#movie-list').append(box)
        }
    }

    // Function to create category buttons
    function createCategoryButtons(categories) {
        $('#categories').empty(); // Clear existing buttons
        for (let i = 0; i < categories.length; i++) {
            const category = categories[i];
            const button = $('<button>').addClass('category-button').text(category);
            button.on('click', function() {
                const filteredMovies = [];
                for (let j = 0; j < movies.length; j++) {
                    if (movies[j].category === category) {
                        filteredMovies.push(movies[j]);
                    }
                }
                renderMovies(filteredMovies);
            });
            $('#categories').append(button);
        }
    }

    // Function to sort movies by rating
    function sortMovies(order) {
        const sortedMovies = [];
        for (let i = 0; i < movies.length; i++) {
            sortedMovies.push(movies[i]);
        }
        sortedMovies.sort(function(a, b) {
            if (order === 'asc') {
                return a.rating - b.rating;
            } else {
                return b.rating - a.rating;
            }
        });
        renderMovies(sortedMovies);
    }

    // Initial rendering
    const categories = [];
    for (let i = 0; i < movies.length; i++) {
        if (categories.indexOf(movies[i].category) === -1) {
            categories.push(movies[i].category);
        }
    }
    createCategoryButtons(categories);
    renderMovies(movies);

    // Search functionality
    function searchMovies() {
        const query = $('#search-bar').val().toLowerCase();
        const filteredMovies = [];
        for (let i = 0; i < movies.length; i++) {
            if (movies[i].title.toLowerCase().indexOf(query)!== -1) {
                filteredMovies.push(movies[i]);
            }
        }
        renderMovies(filteredMovies);
    }

    // Handle search on Enter key press
    $('#search-bar').on('keyup', function(event) {
        if (event.key === 'Enter') { // Enter key
            searchMovies();
        }
    });

    // Handle search button click
    $('#search-button').on('click', function() {
        searchMovies();
    });

    // Handle sort buttons
    $('#sort-top-rated').on('click', function() {
        sortMovies('desc'); // Sort by top rated
    });

    $('#sort-low-rated').on('click', function() {
        sortMovies('asc'); // Sort by low rated
    });
});