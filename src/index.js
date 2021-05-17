import React, { useState, useEffect } from "react";
import { View, 
          SafeAreaView, 
          Text, 
          StyleSheet, 
          StatusBar, 
          ScrollView, 
          FlatList,
          TouchableOpacity
        } from "react-native";

import api from './services/api';

//Não possuem valor semântico (significado)
//Não possuem estilização própria
//toda estilização se fez a a partir do css (StylesSheet)
//Todos componentes possem por padrão 'display: flex'
//O Statusbar controle cores

//View: div, footer, header, main, aside,  section ...
//Text: p, span, strong, h1, h2, ...

//Todo o resto do aplicativo mobile são iguais ao do web.
//por exemplo podemos usar consumir o api do backend com o 
//yarn add axios no api.js (a ser criado no pasta src/services)
//criar a pasta "src/services" (Igual a do Web) e dentro "api.js"
//nAo usar o ScrollView, não podemos usar no css o "justifyContent" e o "alignItems"


export default function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {

    //Listar os projetos
    api.get('projects').then(response => {

      console.log(response.data);
      setProjects(response.data);
    })
  }, []);


  async function handleAddProject(){
    const response = await api.post('projects', {
      title: `Novo projeto ${Date.now()}`,
      owner: `Samir Landou`
    })

    const project = response.data;
    
    //Imutabilidade
    setProjects([... projects, project]);
  }


  return (
    <>
    <StatusBar barStyle="light-content" backgroundColor="#FF59c1"/>

      <SafeAreaView style={styles.container}>
      <FlatList
        //style={styles.container}
        data={projects}
        keyExtractor={project => project.id}
        renderItem={({item: project}) => (
          <Text style={styles.project}>{project.title}</Text>
        )}
      />
      
      <TouchableOpacity 
        activeOpacity={0.6} 
        style={styles.button}
        onPress={handleAddProject}
        >
          <Text style={styles.buttonText}>Adicionar Projeto</Text>
      </TouchableOpacity>

      </SafeAreaView>

      {/*<ScrollView style={styles.container}>
        <Text style={styles.title}>Hello World!</Text>
        
        {projects.map(project => (
          <Text style={styles.project} key={project.id}>{project.title}</Text>))}

        </ScrollView>*/}


      {/*<View style={styles.container}>
        <Text style={styles.title}>Hello World!</Text>
        
        {projects.map(project => (
          <Text style={styles.project} key={project.id}>{project.title}</Text>))}

        </View>*/}
    </>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,//deixa a tela chei para ser preenchido
    backgroundColor: '#7159c1',
    //justifyContent: 'center',//precisa comentar quando usa o ScrollView
    //alignItems: 'center'//precisa comentar quando usa o ScrollView
  },
  title:{
    color: '#FFF',
    fontSize: 20,
    fontWeight:'bold'
  },
  project:{
    color: '#FFF',
    fontSize: 20,
  },
  button:{
    backgroundColor:'#FFF',
    margin: 20,
    height: 50,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems:'center'
  },
  buttonText:{
    fontWeight: 'bold',
    fontSize: 16,
  }


});

