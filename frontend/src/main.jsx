import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider} from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';
import { ColorModeScript } from '@chakra-ui/react';
import { mode } from "@chakra-ui/theme-tools";
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

// changing color of our website i.e dark/light mode

// global is a function that is taking props

const styles={
  global:(props)=>(
    {
      body:{
        color: mode("gray.800", "whiteAlpha.900")(props),
			  bg: mode("gray.100", "#101010")(props),
      }
    }
  )
};

// intital color of app is dark , acc to user it will be decided on basis of default mode of browser

const config={
  initialColorMode:"dark",
  useSystemColorMode:true,
}

// changing colors

const colors={
  
  gray:{
    light:"#616161",
    dark:"#1e1e1e"
  }
}

// theme and pass all things inside it

const theme=extendTheme({config,styles,colors});

// react strict mode renderes every component twice on development mode, production me normal
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* WRAP INSIDE Rrecoilroot to use it*/}

    <RecoilRoot>
      <BrowserRouter>
        <ChakraProvider theme={theme}>
  
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
  
          <App />
  
        </ChakraProvider>
      </BrowserRouter>
    </RecoilRoot>
    
    
  </React.StrictMode>,
)
