import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import {
  Container,
  FieldGroup,
  FieldText,
  FieldTextInput,
  LoadingOverlay,
  LoadingText,
  PageTitle
} from './App.styles';

export default function App() {
  const [zipCode, setZipCode] = useState<string>('');
  const [streetAdd, setStreetAdd] = useState<string>('');
  const [addressNumber, setAddressNumber] = useState<string>('');
  const [complement, setComplement] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [district, setDistrict] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /**
   * Obtém informações de endereço com base em um CEP fornecido.
   *
   * @async
   * @param {string} code - O CEP a ser pesquisado (no formato "XXXXX-XXX").
   * @returns {Promise<void>} - Uma promessa que resolve quando os dados do endereço são obtidos ou rejeita em caso de erro.
   * @throws {Error} - Lança um erro se a solicitação de API falhar.
   */
  const getCEP = async (code: string): Promise<void> => {
    try {
      setIsLoading(true);
      const strippedCode = code.replace('-', '').trim();
      const { data } = await axios.get(`https://viacep.com.br/ws/${strippedCode}/json/`);

      if (!data.erro) {
        const { logradouro, bairro, localidade, uf, complemento } = data;
        setStreetAdd(logradouro);
        setDistrict(bairro);
        setCity(localidade);
        setState(uf);

        if (complement.length > 0) {
          setComplement(complement);
        }
      } else {
        clearAddressFields();
      }
    } catch (error) {
      console.error(error);
      clearAddressFields();
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Limpa os campos do endereço definindo-os como vazios.
   *
   * @function
   * @returns {void}
   */
  const clearAddressFields = () => {
    setStreetAdd('');
    setDistrict('');
    setCity('');
    setState('');
    setComplement('');
  };

  /**
   * Formata e define o valor do CEP no formato "XXXXX-XXX".
   *
   * @function
   * @param {string} code - O CEP a ser formatado.
   * @returns {void}
   */
  const setMaskedZipcode = (code: string): void => {
    const masked = code.replace(/(\d{5})(\d{3})/, '$1-$2');
    setZipCode(masked);
  };

  /**
   * Efeito colateral que chama a função `getCEP` quando o estado `zipCode` é atualizado e possui um CEP válido.
   *
   * @effect
   * @listens zipCode
   */
  useEffect(() => {
    if (zipCode && zipCode.length === 9) {
      getCEP(zipCode);
    }
  }, [zipCode]);

  return (
    <Container>
      <StatusBar backgroundColor="#aaff1e" translucent />
      <PageTitle>Cadastre seu endereço</PageTitle>

      {isLoading && (
        <LoadingOverlay>
          <LoadingText>Carregando...</LoadingText>
        </LoadingOverlay>
      )}

      <FieldGroup>
        <FieldText>CEP:</FieldText>
        <FieldTextInput value={zipCode} onChangeText={setMaskedZipcode} maxLength={9} />
      </FieldGroup>
      <FieldGroup>
        <FieldText>Rua:</FieldText>
        <FieldTextInput value={streetAdd} onChangeText={setStreetAdd} />
      </FieldGroup>
      <FieldGroup>
        <FieldText>Número:</FieldText>
        <FieldTextInput value={addressNumber} onChangeText={setAddressNumber} />
      </FieldGroup>
      <FieldGroup>
        <FieldText>Complemento:</FieldText>
        <FieldTextInput value={complement} onChangeText={setComplement} />
      </FieldGroup>
      <FieldGroup>
        <FieldText>Estado:</FieldText>
        <FieldTextInput value={state} onChangeText={setState} />
      </FieldGroup>
      <FieldGroup>
        <FieldText>Cidade:</FieldText>
        <FieldTextInput value={city} onChangeText={setCity} />
      </FieldGroup>
      <FieldGroup>
        <FieldText>Bairro:</FieldText>
        <FieldTextInput value={district} onChangeText={setDistrict} />
      </FieldGroup>
    </Container>
  );
}
