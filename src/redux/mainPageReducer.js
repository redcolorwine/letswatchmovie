let initialState = {
    filmItems: [
        {
            id: 1, title: 'Escape from ShawShank', description: 'The Shawshank Redemption is a 1994 Americandrama film written and directed by FrankDarabont, based on the 1982 Stephen King novella Rita Hayworth and Shawshank Redemption. It tells the story of banker Andy Dufresne Tim Robbins, who is sentenced to life in Shawshank State Penitentiary for the murders of his wife and her lover, despite his claims of innocence. Over the following two decades, he befriends a fellow prisoner, contraband smuggler Ellis Red Redding Morgan Freeman, and becomes instrumental in a money-laundering operation led by the prison warden Samuel Norton Bob Gunton. William Sadler, Clancy Brown, Gil Bellows, and James Whitmore appear in supporting roles.',
            img: require('./../media/posters/shawshank.jpg')
        },
        {
            id: 2, title: 'Archer', description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.',
            img: require('./../media/posters/archer.jpg')
        },
        {
            id: 3, title: 'Assassin', description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.',
            img: require('./../media/posters/assassin.jpg')
        },
        {
            id: 4, title: 'Freedom', description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.',
            img: require('./../media/posters/freedom.jpg')
        },
        {
            id: 5, title: 'Rememory', description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.',
            img: require('./../media/posters/rememory.jpg')
        }
    ],
    mostPopularFilms: '',
    genres: '',
    chosenFilm: 'none',
    currentMainFilm: 5
}


let mainPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_MOST_POPULAR_FILMS':
            return {
                ...state,
                mostPopularFilms: action.mostPopularFilms
            }
        case 'GET_ONE_FILM':
            let chose = state.mostPopularFilms.filter(film => film.id == action.filmId);
            return {
                ...state,
                chosenFilm: chose
            }
        case 'SET_GENRES':
            return {
                ...state,
                genres: action.genres
            }
        case 'SET_CURRENT_MAIN_FILM':
            return {
                ...state,
                currentMainFilm: action.currentFilm
            }
        default: return state
    }
}

export default mainPageReducer;