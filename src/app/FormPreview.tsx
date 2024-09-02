import { Textarea } from '@/components/ui/textarea';
import { formatCEP, formatCPF, formatRG, validateCEP, validateCPF, validateRG } from '@/lib/validations';
import { AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, useState } from 'react';

type Field = {
  type: string;
  id: Key | null | undefined | bigint;
  label: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<AwaitedReactNode> | null | undefined;
  required: boolean | undefined;
  options: any[];
};

type FormPreviewProps = {
  fields: Field[];
  title: string;
  logo: string;
  name: string;
};

const FormPreview = ({ fields, title, logo, name }: FormPreviewProps) => {
  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  console.log('title', title);
  const handleInputChange = (fieldId: Key | null | undefined, value: string, fieldType: string | undefined) => {
    let formattedValue = value;
    let error = null;

    switch (fieldType) {
      case 'cep':
        formattedValue = formatCEP(value.replace(/\D/g, ''));
        if (!validateCEP(formattedValue)) {
          error = 'CEP inválido';
        }
        break;
      case 'cpf':
        formattedValue = formatCPF(value.replace(/\D/g, ''));
        if (!validateCPF(formattedValue)) {
          error = 'CPF inválido';
        }
        break;
      case 'rg':
        formattedValue = formatRG(value.replace(/\D/g, ''));
        if (!validateRG(formattedValue)) {
          error = 'RG inválido';
        }
        break;
    }

    setFormData({ ...formData, [fieldId as string]: formattedValue });
    setErrors({ ...errors, [fieldId as string]: error });
  };
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log('Form data:', formData);
    alert('Formulário enviado com sucesso!');
  };

  return (
    <div className="border p-4 rounded">
      {name && (
        <h1 className="text-2xl font-bold mb-4 text-center">{name}</h1>
      )}
      {logo && (
        <div className="mb-4">
          <img src={logo} alt="Form Logo" className="max-w-xs mx-auto" />
        </div>
      )}
      {title && (
        <h1 className="text-sm font-bold mb-4 text-center">{title}</h1>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        {fields?.map((field: { type: any; id: Key | null | undefined; label: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<AwaitedReactNode> | null | undefined; required: boolean | undefined; options: any[]; }) => {
          switch (field.type) {
            case 'text':
            case 'number':
            case 'email':
            case 'cep':
            case 'cpf':
            case 'rg':
              return (
                <div key={field.id}>
                  <label className="block mb-1">{field.label}{field.required && '*'}</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    required={field.required}
                    onChange={(e) => handleInputChange(field.id, e.target.value, field.type)}
                  />
                  {errors[String(field.id)] && <p className="text-red-500 text-sm mt-1">{errors[String(field.id)]}</p>}

                </div>
              );
            case 'number':
              return (
                <div key={field.id}>
                  <label className="block mb-1">{field.label}{field.required && '*'}</label>
                  <input
                    type="number"
                    className="w-full p-2 border rounded"
                    required={field.required}
                    onChange={(e) => handleInputChange(field.id, e.target.value, field.type)}
                  />
                </div>
              );

            case 'select':
              return (
                <div key={field.id}>
                  <label className="block mb-1">{field.label}{field.required && '*'}</label>
                  <select
                    className="w-full p-2 border rounded"
                    required={field.required}
                    onChange={(e) => handleInputChange(field.id, e.target.value, field.type)}
                  >
                    {field.options.map((option, index) => (
                      <option key={index} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              );
            case 'textarea':
              return (
                <div key={field.id}>
                  <label className="block mb-1">{field.label}{field.required && '*'}</label>
                  <Textarea required={field.required} />
                </div>
              );
            case 'radio':
              return (
                <div key={field.id}>
                  <label className="block mb-1">{field.label}{field.required && '*'}</label>
                  {field.options.map((option, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="radio"
                        id={`${field.id}-${index}`}
                        value={option}
                        className="mr-2"
                        onChange={(e) => {
                          const currentValues = formData[field.id as string] || [];
                          const newValues = e.target.checked
                            ? [...currentValues, option]
                            : currentValues.filter((v: any) => v !== option);
                          handleInputChange(field.id, newValues, field.type);
                        }}
                      />
                      <label htmlFor={`${field.id}-${index}`}>{option}</label>
                    </div>
                  ))}
                </div>
              );
            default:
              return null;
          }
        })}
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Submit</button>
      </form>
    </div>
  );
};

export default FormPreview;