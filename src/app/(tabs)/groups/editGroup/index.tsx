import { useEffect, useState } from 'react'
import {
  Keyboard,
  Pressable,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { Picker } from '@react-native-picker/picker'
import * as ImagePicker from 'expo-image-picker'
import { Image } from 'expo-image'
import { router } from 'expo-router'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { useGroupStore } from '@/src/store/useGroupStore'
import ModalComponent from '@/src/components/ModalComponent'
import { ButtonCustomizer } from '@/src/components/ButtonCustomizer'
import useKeyboardStatus from '@/src/utils/keyboardUtils'
import { axiosClient, axiosPrivateClient } from '@/src/utils/axios'
import { verticalScale } from '@/src/utils/responsiveUtils'

import Photograph from '@/src/assets/images/photograph.svg'
import Pencil from '@/src/assets/images/pencil.svg'

import { styles as globalStyles } from '@/src/app/styles'
import { theme } from '@/src/theme'
import { styles } from './styles'
import { useAuthStore } from '@/src/store/useAuthStore'

interface FormData {
  name: string
  description?: string
}

interface Categories {
  ativo: boolean
  dataCadastro: string
  descricao: string
  idCategoria: string
}

const schema = yup.object().shape({
  name: yup.string().required('O campo deve ser preenchido'),
  description: yup.string(),
})

export default function Index() {
  const [modalVisible, setModalVisible] = useState(false)
  const [categoriesList, setCategoriesList] = useState<Categories[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [groupImage, setGroupImage] = useState<string>('')

  const { userCod } = useAuthStore()
  const { groupData, setGroupData } = useGroupStore()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: groupData.nome || '',
      description: groupData.descricao || '',
    },
  })

  const isKeyboardVisible = useKeyboardStatus()

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
      base64: true,
    })

    if (!result.canceled) {
      setGroupImage(result.assets[0].base64 ?? '')
    }
  }

  const handleData = async (data: FormData) => {
    const categoria = categoriesList.find(
      (category) => category.descricao === selectedCategory,
    )

    const dataStored = {
      ...groupData,
      nome: data.name,
      descricao: data.description,
      idCategoria: categoria?.idCategoria,
      categoria: categoria?.descricao,
      imgGrupo: groupImage,
    }

    try {
      await setGroupData(dataStored)
      await axiosPrivateClient.put('grupos', {
        userCod,
        ...dataStored,
      })
    } catch (error) {
      __DEV__ && console.log(error)
    } finally {
      router.push('/groups/details')
    }
  }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosClient.post(
          'categoria/lista-categoria?metaData.pageNumber=1&metaData.pageSize=200',
        )

        if (response.status !== 200) {
          throw new Error('Erro ao buscar categorias')
        }

        const { data } = response.data

        const categories = data.filter(
          (categoria: Categories) => categoria.ativo === true,
        )

        setCategoriesList(categories)
        setSelectedCategory(groupData.categoria || 'Outros')
        setGroupImage(groupData.imgGrupo || '')
      } catch (error) {
        console.log('Erro ao conectar com a API de categorias', error)
      }
    }

    fetchCategories()
  }, [groupData.imgGrupo, groupData.categoria])

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1, gap: 8 }}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.imageContainer}>
              {groupImage ? (
                <Image
                  source={{ uri: `data:image/jpeg;base64,${groupImage}` }}
                  style={{ width: '100%', height: '100%' }}
                  alt="imagem do grupo"
                />
              ) : (
                <Photograph width={32} height={32} />
              )}

              <Pressable style={styles.editIcon} onPress={pickImage}>
                <Pencil width={12} height={12} />
              </Pressable>
            </View>

            <View style={{ flex: 1, gap: 8 }}>
              <Text style={styles.label}>Nome</Text>
              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="Ex: Amigos do Bora"
                    placeholderTextColor={theme.colors.fourth}
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
              {errors.name && (
                <Text style={styles.error}>{errors.name.message}</Text>
              )}
            </View>
          </View>

          {/* Category */}
          <View>
            <Text style={styles.label}>Categoria</Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: theme.colors.primaryColor,
                borderRadius: 8,
                marginTop: 8,
              }}
            >
              <Picker
                selectedValue={selectedCategory}
                onValueChange={(itemValue) => setSelectedCategory(itemValue)}
                mode="dialog"
                dropdownIconColor={theme.colors.primaryColor}
                style={{
                  width: '100%',
                  height: 54,
                  fontSize: 16,
                  color: theme.colors.primaryColor,
                }}
              >
                {categoriesList &&
                  categoriesList.map((item) => (
                    <Picker.Item
                      key={item.idCategoria}
                      label={item.descricao}
                      value={item.descricao}
                      fontFamily={theme.fontFamily.medium}
                      color={theme.colors.primaryColor}
                    />
                  ))}
              </Picker>
            </View>
          </View>

          {/* Descrição */}
          <View>
            <Text style={styles.label}>Descrição (opcional)</Text>
            <Controller
              control={control}
              name="description"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={[
                    styles.input,
                    { height: verticalScale(120), textAlignVertical: 'top' },
                  ]}
                  placeholder="Insira uma breve descrição"
                  placeholderTextColor={theme.colors.fourth}
                  maxLength={100}
                  multiline
                  numberOfLines={10}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.description && (
              <Text style={styles.error}>{errors.description.message}</Text>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>

      {/* Botão */}
      {!isKeyboardVisible && (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <ButtonCustomizer.Root
            type="tertiaryHalfWidth"
            onPress={() => setModalVisible(true)}
          >
            <ButtonCustomizer.Title
              title="Cancelar"
              customStyles={globalStyles.secondaryButtonText}
            />
          </ButtonCustomizer.Root>

          <ButtonCustomizer.Root
            type="primaryHalfWidth"
            onPress={handleSubmit(handleData)}
          >
            <ButtonCustomizer.Title
              title="Salvar"
              customStyles={globalStyles.primaryButtonText}
            />
          </ButtonCustomizer.Root>
        </View>
      )}

      <ModalComponent
        type="complete"
        title="Deseja realmente sair?"
        description="Você perderá a edição do grupo"
        textButton1="Cancelar"
        textButton2="Confirmar"
        onPress={() => router.back()}
        showModal={[modalVisible, setModalVisible]}
      />
    </View>
  )
}
