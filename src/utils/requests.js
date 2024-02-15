// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';


const WebServices = {
  get: async (endpoint, params) => {
    
    try {
      
      const response = await axios.get(`${process.env.REACT_APP_HOST_API + endpoint}`, {
        headers: {
          authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
          XApiKey: `TPJDtRG0cP`,
        },
        params,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      // Hata durumunda yapmak istediğiniz işlemleri burada gerçekleştirebilirsiniz.
      throw error; // İsteğe bağlı olarak hatayı yeniden fırlatabilirsiniz.
    }
  },

  post: async (endpoint, params, isForm) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_HOST_API + endpoint}`, params, {
        headers: {
          authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
          XApiKey: `TPJDtRG0cP`,
          'Content-Type': isForm ? 'multipart/form-data' : 'application/json',
        },
      });
      return { success: true, response: response.data };
    } catch (error) {
      console.error(error);
      return { success: false, response: error };
    }
  },

  put: async (endpoint, params, isForm) => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_HOST_API + endpoint}`, params, {
        headers: {
          authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
          XApiKey: `TPJDtRG0cP`,
          'Content-Type': isForm ? 'multipart/form-data' : 'application/json',
        },
      });
      return { success: true, response: response.data };
    } catch (error) {
      console.error(error);
      return { success: false, response: error };
    }
  },

  delete: async (endpoint) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_HOST_API + endpoint}`, {
        
        headers: {
          authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
          XApiKey: `TPJDtRG0cP`,
        },
      });
      console.log(response);
      return response.data;
    } catch (error) {
      console.error(error);
      // Hata durumunda yapmak istediğiniz işlemleri burada gerçekleştirebilirsiniz.
      throw error; // İsteğe bağlı olarak hatayı yeniden fırlatabilirsiniz.
    }
  },

  // ** getMethods

  // ** Branches
  getAllBranches: (params) => WebServices.get('Branch/Get', params),
  getAllBranchesDropdown: (params) => WebServices.get('Cinema/GetBranchesForDropdown', params),
  getBranchId: (params) => WebServices.get('Branch/GetBranchById', params),
  CreateBranch: (params, isForm) => WebServices.post('Branch/Create', params, isForm),
  UpdateBranch: (params, isForm) => WebServices.put('Branch/Update', params, isForm),
  DeleteBranch: (params) => WebServices.delete(`Branch/Delete/${params.Id}`),

  // ** Banners
  getAllBanners: (params) => WebServices.get('Banner/Get', params),
  getBannerId: (params) => WebServices.get('Banner/GetById', params),
  CreateBanner: (params, isForm) => WebServices.post('BannerLang/Create', params, isForm),
  UpdateBanner: (params, isForm) => WebServices.put('Banner/Update', params, isForm),
  DeleteBanner: (params) => WebServices.delete(`Banner/Delete/${params.Id}`),

  // ** ContentPage
  getAllContentPages: (params) => WebServices.get('Content/Get', params),
  getContentPageId: (params) => WebServices.get('Content/GetById', params),
  CreateContentPage: (params, isForm) => WebServices.post('Content/Create', params, isForm),
  UpdateContentPage: (params, isForm) => WebServices.put('Content/Update', params, isForm),
  DeleteContentPage: (params) => WebServices.delete(`Content/Delete/${params.Id}`),

  // ** Campaigns
  getAllCampaigns: (params) => WebServices.get('Campaign/Get', params),
  getCampaignId: (params) => WebServices.get('Campaign/GetById', params),
  CreateCampaign: (params, isForm) => WebServices.post('Campaign/Create', params, isForm),
  UpdateCampaign: (params, isForm) => WebServices.put('Campaign/Update', params, isForm),
  DeleteCampaign: (params) => WebServices.delete(`Campaign/Delete/${params.Id}`),

  // ** Slider
  getAllSliders: (params) => WebServices.get(`Slider/Get`, params),
  getSliderId: (params) => WebServices.get('Slider/GetById', params),
  getSliderLang: (params) => WebServices.get(`SliderLang/GetById/${params.Id}`),
  CreateSlider: (params, isForm) => WebServices.post('Slider/Create', params, isForm),
  UpdateSlider: (params, isForm) => WebServices.put('Slider/Update', params, isForm),
  DeleteSlider: (params) => WebServices.delete(`Slider/Delete/${params.Id}`),

  // ** NextProgram
  getAllNextPrograms: (params) => WebServices.get('Cinema/NextProgram', params),
  getAllCinemaNextProgram: (params) => WebServices.get('NextProgram/Get', params),
  CreateNextProgram: (params, isForm) => WebServices.post('NextProgram/Create', params, isForm),
  DeleteNextProgram: (params) => WebServices.delete(`Nextprogram/Delete/${params.Id}`),

  // ** News
  getAllNews: (params) => WebServices.get(`News/Get`, params),
  getNewId: (params) => WebServices.get('News/GetNewsById', params),
  CreateNew: (params, isForm) => WebServices.post('News/Create', params, isForm),
  UpdateNew: (params, isForm) => WebServices.put('News/Update', params, isForm),
  DeleteNew: (params) => WebServices.delete(`News/Delete/${params.Id}`),

  // ** E Bulten
  getBulten: (params) => WebServices.get('Subscribe/Get', params),
  DeleteBulten: (params) => WebServices.post(`Subscribe/Delete/${params.Id}`, params),

  // ** Settings
  getSettings: (params) => WebServices.get('Settings/Get', params),
  UpdateSetting: (params) => WebServices.put('Settings/Update', params),

  // ** Languages
  getAllLanguages: (params) => WebServices.get('Language/Get', params),
};

export { WebServices };
