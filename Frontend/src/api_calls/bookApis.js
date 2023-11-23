import axios from "axios";

export const createBook = async (formData) => {
    try {
      const data = await axios.post(
        `http://localhost:5000/book/`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      return data;
    } catch (err) {
      return err;
    }
  };

export const getAllBook = async () => {
  const data = await axios.get(
    `http://localhost:5000/book/`
  );

  return data;
};



export const getSingleBook = async (id) => {
    const data = await axios.get(
      `http://localhost:5000/book/single-book/${id}`
    );
  
    return data;
  };


  export const updateBook = async (id,formData) => {
  try{  const data = await axios.put(
      `http://localhost:5000/book/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  
    return data;
  } catch (err) {
    return err;
  }
  };

  
  export const deleteBook = async (id) => {
    const data = await axios.delete(
      `http://localhost:5000/book/${id}`
    );
  
    return data;
  };


