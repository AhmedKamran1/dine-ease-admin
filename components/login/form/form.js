import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { userActions } from '@/store/user/userSlice';

// Services
import { login } from '@/services';

// Form
import { useFormik } from 'formik';
import { loginSchema } from '@/utils/validation-schema/auth';

// Snackbar
import { enqueueSnackbar } from 'notistack';
import { getError } from '@/helpers';

// Icons
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

// Styles
import { IconButton, InputAdornment } from '@mui/material';
import {
  Text,
  FormButton,
  InputField,
  FormContainer,
  FlexContainer,
} from '@/components/UI';

const LoginForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const submitHandler = async (values) => {
    try {
      formik.setSubmitting(true);
      const response = await login(values);
      const { details, token } = response.data;
      dispatch(userActions.login(details));
      localStorage.setItem('token', token);
      router.push('/dashboard/overview', null, { shallow: true });
    } catch (e) {
      enqueueSnackbar({ variant: 'error', message: getError(e) });
    } finally {
      formik.setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: submitHandler,
  });

  return (
    <React.Fragment>
      <FormContainer component="form" onSubmit={formik.handleSubmit}>
        <Text variant="header" textAlign={'center'} fontWeight={800}>
          Welcome to&nbsp;
          <Text variant="header" color="primary">
            DineEase
          </Text>
        </Text>
        <FlexContainer gap={1} mb={2}>
          <AdminPanelSettingsIcon color="primary" fontSize="large" />
          <Text variant="main" color="primary" fontWeight={600}>
            Admin Portal
          </Text>
        </FlexContainer>
        <InputField
          name="email"
          label="Email"
          variant="outlined"
          placeholder="Enter Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.email && Boolean(formik.touched.email)}
          helperText={formik.touched.email && formik.errors.email}
        />

        <InputField
          name="password"
          label="Password"
          variant="outlined"
          placeholder="Enter Password"
          type={showPassword ? 'text' : 'password'}
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.password && Boolean(formik.touched.password)}
          helperText={formik.touched.password && formik.errors.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <FormButton type="submit" disabled={formik.isSubmitting}>
          <Text variant="sub">Login</Text>
        </FormButton>
      </FormContainer>
    </React.Fragment>
  );
};

export default LoginForm;
