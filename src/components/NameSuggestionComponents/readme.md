# Como usar o componente

```js
  import NameSuggestionComponents from '../components/NameSuggestionComponents'
```

## Buscar os nomes na API
  ```js 
    const namesSuggestionFromApi = [
      '@joão_silva95',
      '@joãosilva2024',
      'joão.silva-br',
    ]
  ```

## Função para lidar com o retorno do componente com o nome selecionado
  ```js
    const handleNameSelected = (nameSelected: string) => {
      console.log('name selected:', nameSelected)
    }
  ```

## Usar o componentes
  ```js
    <NameSuggestionComponents
      namesSuggestionFromApi={namesSuggestionFromApi}
      onSelect={handleNameSelected}
    />
  ```