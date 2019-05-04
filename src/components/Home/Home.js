
import React, { Component } from 'react';
import { API_URL, API_KEY, IMAGE_BASE_URL, BACKDROP_SIZE, POSTER_SIZE } from '../../config';
import HeroImage from '../elements/HeroImage/HeroImage';
import SearchBar from '../elements/SearchBar/SearchBar';
import FourColGrid from '../elements/FourColGrid/FourColGrid';
import MovieThumb from '../elements/MovieThumb/MovieThumb';
import LoadMoreBtn from '../elements/LoadMoreBtn/LoadMoreBtn';
import Spinner from '../elements/Spinner/Spinner';
import './Home.css';

class Home extends Component {
    
    state = {
        movie: [],
        heroImage: null,
        loading: false,
        currentPage: 0,
        totalPages: 0,
        searchTerm: ''
    }

    componentDidMount() {
        if (localStorage.getItem('HomeState')) {
            const state = JSON.parse(localStorage.getItem('HomeState'));
            this.setState({...state});
        } else {
            this.setState({ loading: true });
            const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
            this.fetchItem(endpoint);
        }
        
    }

    fetchItem = async endpoint => {
        const { movie, heroImage, searchTerm} = this.state;
        const result = await (await fetch(endpoint)).json();
        try{
            this.setState({
                movie: [...movie, ...result.results],
                heroImage: heroImage || result.results[0],
                loading: false,
                currentPage: result.page,
                totalPages: result.total_pages
            }, () => {
                if(searchTerm === "") {
                    localStorage.setItem('HomeState', JSON.stringify(this.state));
                }
            });
        } catch (e) {
            console.log("There was an error", e);
        }
    }

    searchItems = (searchTerm) => {
        console.log(searchTerm);
        let endpoint = '';
        this.setState({
            movie: [],
            loading: true,
            searchTerm
        })

        if (searchTerm === '') {
            endpoint = `${ API_URL }movie/popular?api_key=${ API_KEY }&language=en-US&page=1`;
        } else {
            endpoint = `${ API_URL }search/movie?api_key=${ API_KEY }&language=en-US&query=${ searchTerm }`;
        }

        this.fetchItem(endpoint);
    }

    loadMoreItems = () => {
        let endpoint = '';
        this.setState({ loading: true });

        if(this.state.searchTerm === '') {
            endpoint = `${ API_URL }movie/popular?api_key=${ API_KEY }&language=en-US&page=${ this.state.currentPage + 1 }`;
        } else {
            endpoint = `${ API_URL }search/movie?api_key=${ API_KEY }&language=en-US&query=${ this.state.searchTerm }&page=${ this.state.currentPage + 1 }`; 
        }

        this.fetchItem(endpoint);
    }

    render() {
        // ES6 destructuring the state

        const { movie, heroImage, loading, currentPage, totalPages, searchTerm } = this.state;

        return (
            <div className="rmdb-home">
                {heroImage ? 
                    <div>
                        <HeroImage 
                            image = { `${ IMAGE_BASE_URL }${ BACKDROP_SIZE }${ this.state.heroImage.backdrop_path }` }
                            title = { heroImage.original_title }
                            text = { heroImage.overview }
                        />
                        <SearchBar callback={ this.searchItems }/>
                    </div> : null}

                <div className="rmdb-home-grid">
                    <FourColGrid 
                        header={ searchTerm ? 'Search Result' : 'Popular Movie' }
                        loading={ loading }>

                        { movie.map( (element, i) => {
                            return <MovieThumb
                                        key={ i }
                                        clickable={ true }
                                        image={ element.poster_path ? `${ IMAGE_BASE_URL }${ POSTER_SIZE }${ element.poster_path }` : './images/no_image.jpg' }
                                        movieId={ element.id }
                                        movieName={ element.original_title } />
                        })}

                    </FourColGrid>
                    
                    { loading ? <Spinner /> : null }
                    { (currentPage <= totalPages && !loading) ?
                        <LoadMoreBtn text="Load More" onClick={ this.loadMoreItems } /> : null }
                </div>
            </div>
        )
    }
}

export default Home;