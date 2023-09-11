import { styled } from "styled-components/native";

export const Container = styled.ScrollView`
  padding: 40px 32px;
  background: #f0f0f5;
`;

export const Title = styled.Text`
  text-align: center;
  font-size: 28px;
  font-weight: 700;
  margin: 16px 0;
`;

export const Form = styled.View`
  flex-direction: column;
  gap: 12px;
`;

export const FieldText = styled.Text`
  font-size: 24px;
  font-weight: 500;
  color: #232323;
`;

export const FieldTextInput = styled.TextInput`
  border: 2px solid #232323;
  border-radius: 8px;
  padding: 8px 16px;
`;
