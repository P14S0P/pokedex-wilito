import React, { useEffect, useState } from 'react'
import './App.css';
import logo from './pokemonlogo.png';
import { CardActionArea, CardContent, CardMedia, Grid } from '@mui/material';
import axios from 'axios';

const Layout = () => {
  const [pokemon, setPokemon] = useState([])
  
  const loadData = () => {
    axios.get('https://pokeapi.co/api/v2/pokemon')
       .then(resp => {
          console.log(resp.data)
          for (let i = 0; i < resp.data.results.length; i++) {
            axios.get(resp.data.results[i].url)
            .then(result=>{
                setPokemon(prevArray => [...prevArray, result.data])
            })
          }
       })
      }

  useEffect(loadData, [])
  
  return (
    <> 
      <div className="Pokemons">
        <img src={logo} className="Pokemon-Logo" alt="Logo"></img>
          <Grid container spacing={2}>
              {pokemon.map((poke, index) => (
                <Grid key={index} item xs={12} sm={4}>
                  <CardActionArea className='Pokemon-cards' sx={{ borderRadius: '16px' }}>
                  <h4 className='Pokemon-name'>{poke.name}</h4>
                      <CardContent className='Card-content'>
                        <CardMedia image={poke.sprites.front_default} className='Pokemon-image'>
                        </CardMedia>
                      </CardContent>
                  </CardActionArea>
                </Grid> 
              ))}
          </Grid>    
      </div>
    </> 
  );
}

export default Layout
