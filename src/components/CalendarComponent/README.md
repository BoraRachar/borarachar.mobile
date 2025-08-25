# 📅 Exemplos de Uso do Calendário

## 🚀 Exemplo Básico

```tsx
import { CalendarComponent } from '@/src/components/CalendarComponent';

const [isVisible, setIsVisible] = useState(false);
const [selectedDate, setSelectedDate] = useState(null);

<CalendarComponent
  visible={isVisible}
  onClose={() => setIsVisible(false)}
  onConfirm={(date) => {
    setSelectedDate(date);
    setIsVisible(false);
  }}
/>
```

## 📱 Exemplo com Botão

```tsx
import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import { CalendarComponent } from '@/src/components/CalendarComponent';

export default function MinhaTela() {
  const [mostrarCalendario, setMostrarCalendario] = useState(false);
  const [dataEscolhida, setDataEscolhida] = useState(null);

  return (
    <View>
      <Button 
        title="Escolher Data" 
        onPress={() => setMostrarCalendario(true)} 
      />
      
      <Text>
        {dataEscolhida ? dataEscolhida.toLocaleDateString('pt-BR') : 'Nenhuma data escolhida'}
      </Text>
      
      <CalendarComponent
        visible={mostrarCalendario}
        onClose={() => setMostrarCalendario(false)}
        onConfirm={(data) => {
          setDataEscolhida(data);
          setMostrarCalendario(false);
        }}
        title="Escolha uma data"
      />
    </View>
  );
}
```

## 🎯 Exemplo com Input

```tsx
import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { CalendarComponent } from '@/src/components/CalendarComponent';

export default function InputData() {
  const [mostrarCalendario, setMostrarCalendario] = useState(false);
  const [dataEscolhida, setDataEscolhida] = useState(null);

  return (
    <View>
      <TouchableOpacity 
        onPress={() => setMostrarCalendario(true)}
        style={{ padding: 16, borderWidth: 1, borderColor: '#ccc', borderRadius: 8 }}
      >
        <Text>
          {dataEscolhida ? dataEscolhida.toLocaleDateString('pt-BR') : 'Toque para escolher data'}
        </Text>
      </TouchableOpacity>
      
      <CalendarComponent
        visible={mostrarCalendario}
        onClose={() => setMostrarCalendario(false)}
        onConfirm={(data) => {
          setDataEscolhida(data);
          setMostrarCalendario(false);
        }}
        title="Selecione uma data"
      />
    </View>
  );
}
```

## 🎂 Exemplo Data de Nascimento

```tsx
const [mostrarCalendario, setMostrarCalendario] = useState(false);
const [dataNascimento, setDataNascimento] = useState(null);

<CalendarComponent
  visible={mostrarCalendario}
  onClose={() => setMostrarCalendario(false)}
  onConfirm={(data) => {
    setDataNascimento(data);
    setMostrarCalendario(false);
  }}
  maxDate={new Date()}  // Não permite datas futuras
  title="Data de Nascimento"
/>
```

## ✈️ Exemplo Data de Viagem

```tsx
const [mostrarCalendario, setMostrarCalendario] = useState(false);
const [dataViagem, setDataViagem] = useState(null);

<CalendarComponent
  visible={mostrarCalendario}
  onClose={() => setMostrarCalendario(false)}
  onConfirm={(data) => {
    setDataViagem(data);
    setMostrarCalendario(false);
  }}
  minDate={new Date()}  // Não permite datas passadas
  title="Data da Viagem"
/>
```

## 📅 Exemplo Período Específico

```tsx
const [mostrarCalendario, setMostrarCalendario] = useState(false);
const [dataEscolhida, setDataEscolhida] = useState(null);

<CalendarComponent
  visible={mostrarCalendario}
  onClose={() => setMostrarCalendario(false)}
  onConfirm={(data) => {
    setDataEscolhida(data);
    setMostrarCalendario(false);
  }}
  minDate={new Date(2024, 0, 1)}    // 1º de janeiro de 2024
  maxDate={new Date(2024, 11, 31)}  // 31 de dezembro de 2024
  title="Data em 2024"
/>
```

## 🎉 Exemplo Data de Evento

```tsx
const [mostrarCalendario, setMostrarCalendario] = useState(false);
const [dataEvento, setDataEvento] = useState(null);

<CalendarComponent
  visible={mostrarCalendario}
  onClose={() => setMostrarCalendario(false)}
  onConfirm={(data) => {
    setDataEvento(data);
    setMostrarCalendario(false);
  }}
  minDate={new Date()}  // Não permite datas passadas
  title="Data do Evento"
  closeOnSelect={true}  // Fecha ao selecionar
/>
```

## 📝 Exemplo com Validação

```tsx
const [mostrarCalendario, setMostrarCalendario] = useState(false);
const [dataEscolhida, setDataEscolhida] = useState(null);

const handleDataConfirm = (data) => {
  if (data) {
    const hoje = new Date();
    const diferenca = hoje.getTime() - data.getTime();
    const dias = Math.ceil(diferenca / (1000 * 3600 * 24));
    
    if (dias < 18 * 365) { // Menor de 18 anos
      alert('Você deve ter pelo menos 18 anos');
      return;
    }
  }
  
  setDataEscolhida(data);
  setMostrarCalendario(false);
};

<CalendarComponent
  visible={mostrarCalendario}
  onClose={() => setMostrarCalendario(false)}
  onConfirm={handleDataConfirm}
  maxDate={new Date()}  // Não permite datas futuras
  title="Data de Nascimento"
/>
```

## 🔄 Exemplo com Múltiplas Datas

```tsx
const [mostrarCalendario, setMostrarCalendario] = useState(false);
const [datasEscolhidas, setDatasEscolhidas] = useState([]);
const [tipoData, setTipoData] = useState('inicio'); // 'inicio' ou 'fim'

const abrirCalendario = (tipo) => {
  setTipoData(tipo);
  setMostrarCalendario(true);
};

const handleDataConfirm = (data) => {
  if (tipoData === 'inicio') {
    setDatasEscolhidas([data, datasEscolhidas[1]]);
  } else {
    setDatasEscolhidas([datasEscolhidas[0], data]);
  }
  setMostrarCalendario(false);
};

return (
  <View>
    <TouchableOpacity onPress={() => abrirCalendario('inicio')}>
      <Text>Data Início: {datasEscolhidas[0]?.toLocaleDateString('pt-BR') || 'Escolher'}</Text>
    </TouchableOpacity>
    
    <TouchableOpacity onPress={() => abrirCalendario('fim')}>
      <Text>Data Fim: {datasEscolhidas[1]?.toLocaleDateString('pt-BR') || 'Escolher'}</Text>
    </TouchableOpacity>
    
    <CalendarComponent
      visible={mostrarCalendario}
      onClose={() => setMostrarCalendario(false)}
      onConfirm={handleDataConfirm}
      minDate={tipoData === 'fim' ? datasEscolhidas[0] : undefined}
      title={`Data de ${tipoData === 'inicio' ? 'Início' : 'Fim'}`}
    />
  </View>
);
```

## 🎨 Exemplo com Estilo Personalizado

```tsx
const [mostrarCalendario, setMostrarCalendario] = useState(false);
const [dataEscolhida, setDataEscolhida] = useState(null);

return (
  <View>
    <TouchableOpacity 
      onPress={() => setMostrarCalendario(true)}
      style={{
        backgroundColor: '#007AFF',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center'
      }}
    >
      <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>
        {dataEscolhida ? dataEscolhida.toLocaleDateString('pt-BR') : 'Selecionar Data'}
      </Text>
    </TouchableOpacity>
    
    <CalendarComponent
      visible={mostrarCalendario}
      onClose={() => setMostrarCalendario(false)}
      onConfirm={(data) => {
        setDataEscolhida(data);
        setMostrarCalendario(false);
      }}
      title="Escolha uma data"
    />
  </View>
);
```

---

**💡 Dica: Copie o exemplo que mais se parece com o que você quer fazer!**
