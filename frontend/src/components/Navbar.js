import {Link} from 'react-router-dom'

//style
import { Container,Flex } from '@mantine/core';

const Navbar=()=>{

    return (
        <header  style={{padding:'3px 2px'}}>  
            <Container  fluid h={50} bg="var(--mantine-color-blue-4)" mt='-25px'>
                <Link  to ="/" style={{ textDecoration: 'none'}}>
                    <h1  none align='center' style={{padding:'2px 10px',color:'orange'}}>Workout Buddy </h1>
                </Link>
            </Container>
            
        </header>
       
    )
}

export default Navbar