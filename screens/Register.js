import React, { useState, useEffect } from 'react';
import { Image, View } from 'react-native';
import { TextInput, Button, Text, HelperText } from 'react-native-paper';
import { createAccount } from '../index';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Register = ({ navigation }) => {
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [role] = useState('');
  const [email, setEmail] = useState('');
  const [idroom, setIDroom] = useState('');
  const [fullName, setFullname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [disableCreate, setDisableCreate] = useState(true);

  const hasErrorFullName = () => fullName === "";
  const hasErrorEmail = () => !email.includes('@');
  const hasErrorPassword = () => password.length < 6;
  const hasErrorPasswordConfirm = () => confirmPassword !== password;

  useEffect(() => {
    setDisableCreate(
      hasErrorFullName() ||
      hasErrorEmail() ||
      idroom.trim() === ''||
      hasErrorPassword() ||
      hasErrorPasswordConfirm() ||
      phone.trim() === '' ||
      address.trim() === ''
    );
  }, [fullName, email,idroom, password, confirmPassword, phone, address, hasErrorFullName, hasErrorEmail, hasErrorPassword, hasErrorPasswordConfirm]);

  const handleRegister = () => {
    createAccount(email, password, fullName, phone, address,idroom, role);
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text style={{
        fontSize: 30,
        fontWeight: "bold",
        alignSelf: "center",
        color: "#33CCFF",
        marginTop: 20,
        marginBottom: 20
      }}> ĐĂNG KÍ</Text>
      <TextInput
        label={"Full Name"}
        value={fullName}
        onChangeText={setFullname}
      />
      <HelperText type='error' visible={hasErrorFullName()}>
        Full name không được phép để trống
      </HelperText>
      <TextInput
        label={"Email"}
        value={email}
        onChangeText={setEmail}
      />
      <HelperText type='error' visible={hasErrorEmail()}>
        Địa chỉ email không hợp lệ
      </HelperText>
      <View style={{ flexDirection: "row" }}>
        <TextInput
          label={"Password"}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={showPassword}
          style={{ flex: 1 }}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Image
            source={showPassword ? require('../assets/eye-hidden.png') : require('../assets/eye.png')}
            style={{ width: 20, height: 20, margin: 20 }}
          />
        </TouchableOpacity>
      </View>
      <HelperText type='error' visible={hasErrorPassword()}>
        Password ít nhất 6 kí tự
      </HelperText>
      <View style={{ flexDirection: "row" }}>
        <TextInput
          label={"Confirm Password"}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={showConfirmPassword}
          style={{ flex: 1 }}
        />
        <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
          <Image
            source={showConfirmPassword ? require('../assets/eye-hidden.png') : require('../assets/eye.png')}
            style={{ width: 20, height: 20, margin: 20 }}
          />
        </TouchableOpacity>
      </View>
      <HelperText type='error' visible={hasErrorPasswordConfirm()}>
        Confirm Password phải giống với Password
      </HelperText>
      <TextInput
        label={"Address"}
        value={address}
        onChangeText={setAddress}
        style={{ marginBottom: 20 }}
      />
      <TextInput
        label={"Phone"}
        value={phone}
        onChangeText={setPhone}
        style={{ marginBottom: 20 }}
      />
        <TextInput
        label={"IDroom"}
        value={idroom}
        onChangeText={setIDroom}
        style={{ marginBottom: 20 }}
      />
      <Button textColor='black' buttonColor='#33CCFF' mode='contained' onPress={handleRegister} disabled={disableCreate}>
        Tạo tài khoản
      </Button>
      <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
        <Text>Bạn đã có tài khoản ?</Text>
        <Button onPress={() => navigation.navigate("Login")}>
          Đăng nhập
        </Button>
      </View>
    </View>
  );
};

export default Register;
