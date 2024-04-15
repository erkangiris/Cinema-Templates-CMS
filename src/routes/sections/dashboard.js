import { Suspense, lazy } from 'react';
import { Outlet } from 'react-router-dom';
// auth
import { AuthGuard } from 'src/auth/guard';
// layouts
import DashboardLayout from 'src/layouts/dashboard';
// components
import { LoadingScreen } from 'src/components/loading-screen';
import TranslateBranch from 'src/components/_dash/Branch/Add_Edit/translate_branch';

// ----------------------------------------------------------------------

// ** Branchs
const Branchs = lazy(() => import('src/pages/dashboard/_branchs/Home'));
const AddBranchs = lazy(() => import('src/pages/dashboard/_branchs/add_branch'));
const EditBranchs = lazy(() => import('src/pages/dashboard/_branchs/edit_branch'));
const TranslateBranchs = lazy(() => import('src/pages/dashboard/_branchs/translate_branch'));

// ** Banner Settings
const BannerContent = lazy(() => import('src/pages/dashboard/_content_settings/banner-management/Home'));
const AddBanner = lazy(() => import('src/pages/dashboard/_content_settings/banner-management/add_banner'));
const EditBanner = lazy(() => import('src/pages/dashboard/_content_settings/banner-management/edit_banner'));


// ** Slider Settings
const SliderPage = lazy(() => import('src/pages/dashboard/_content_settings/slider/Home'));
const AddSlider = lazy(() => import('src/pages/dashboard/_content_settings/slider/add_slider'));
const EditSlider = lazy(() => import('src/pages/dashboard/_content_settings/slider/edit_slider'));


// ** Popup Settings
const PopupPage = lazy(() => import('src/pages/dashboard/_content_settings/popup/Home'));
const AddPopup = lazy(() => import('src/pages/dashboard/_content_settings/popup/add_popup'));
const EditPopup = lazy(() => import('src/pages/dashboard/_content_settings/popup/edit_popup'));

// ** Content Settings
const ContentPages = lazy(() => import('src/pages/dashboard/_content_settings/content-pages/Home'));
const AddContentPages = lazy(() => import('src/pages/dashboard/_content_settings/content-pages/add_content'));
const EditContentPages = lazy(() => import('src/pages/dashboard/_content_settings/content-pages/edit_content'));
const TranslateEditContentPages = lazy(() => import('src/pages/dashboard/_content_settings/content-pages/translate_edit'));


// ** Campaign Settings
const HomePageOffer = lazy(() => import('src/pages/dashboard/_content_settings/campaign/Home'));
const AddHomePageOffer = lazy(() => import('src/pages/dashboard/_content_settings/campaign/add_campaign'));
const EditHomePageOffer = lazy(() => import('src/pages/dashboard/_content_settings/campaign/edit_campaign'));

// ** News Settings
const NewsPages = lazy(() => import('src/pages/dashboard/_content_settings/news/Home'));
const AddNews = lazy(() => import('src/pages/dashboard/_content_settings/news/add_news'));
const EditNews = lazy(() => import('src/pages/dashboard/_content_settings/news/edit_news'));

// ** Next Program
const NextProgram = lazy(() => import('src/pages/dashboard/_content_settings/next-program/Home'));

// ** Members

const Elbuten = lazy(() => import('src/pages/dashboard/_members/Elbuten/Home'));

// ** Settings
const Settings = lazy(() => import('src/pages/dashboard/_settings/Home'));

// OVERVIEW
const IndexPage = lazy(() => import('src/pages/dashboard/app'));
const OverviewEcommercePage = lazy(() => import('src/pages/dashboard/ecommerce'));
const OverviewAnalyticsPage = lazy(() => import('src/pages/dashboard/analytics'));
const OverviewBankingPage = lazy(() => import('src/pages/dashboard/banking'));
const OverviewBookingPage = lazy(() => import('src/pages/dashboard/booking'));
const OverviewFilePage = lazy(() => import('src/pages/dashboard/file'));
// PRODUCT
const ProductDetailsPage = lazy(() => import('src/pages/dashboard/product/details'));
const ProductListPage = lazy(() => import('src/pages/dashboard/product/list'));
const ProductCreatePage = lazy(() => import('src/pages/dashboard/product/new'));
const ProductEditPage = lazy(() => import('src/pages/dashboard/product/edit'));
// ORDER
const OrderListPage = lazy(() => import('src/pages/dashboard/order/list'));
const OrderDetailsPage = lazy(() => import('src/pages/dashboard/order/details'));
// INVOICE
const InvoiceListPage = lazy(() => import('src/pages/dashboard/invoice/list'));
const InvoiceDetailsPage = lazy(() => import('src/pages/dashboard/invoice/details'));
const InvoiceCreatePage = lazy(() => import('src/pages/dashboard/invoice/new'));
const InvoiceEditPage = lazy(() => import('src/pages/dashboard/invoice/edit'));
// USER
const UserProfilePage = lazy(() => import('src/pages/dashboard/user/profile'));
const UserCardsPage = lazy(() => import('src/pages/dashboard/user/cards'));
const UserListPage = lazy(() => import('src/pages/dashboard/user/list'));
const UserAccountPage = lazy(() => import('src/pages/dashboard/user/account'));
const UserCreatePage = lazy(() => import('src/pages/dashboard/user/new'));
const UserEditPage = lazy(() => import('src/pages/dashboard/user/edit'));
// BLOG
const BlogPostsPage = lazy(() => import('src/pages/dashboard/post/list'));
const BlogPostPage = lazy(() => import('src/pages/dashboard/post/details'));
const BlogNewPostPage = lazy(() => import('src/pages/dashboard/post/new'));
const BlogEditPostPage = lazy(() => import('src/pages/dashboard/post/edit'));
// JOB
const JobDetailsPage = lazy(() => import('src/pages/dashboard/job/details'));
const JobListPage = lazy(() => import('src/pages/dashboard/job/list'));
const JobCreatePage = lazy(() => import('src/pages/dashboard/job/new'));
const JobEditPage = lazy(() => import('src/pages/dashboard/job/edit'));
// TOUR
const TourDetailsPage = lazy(() => import('src/pages/dashboard/tour/details'));
const TourListPage = lazy(() => import('src/pages/dashboard/tour/list'));
const TourCreatePage = lazy(() => import('src/pages/dashboard/tour/new'));
const TourEditPage = lazy(() => import('src/pages/dashboard/tour/edit'));
// FILE MANAGER
const FileManagerPage = lazy(() => import('src/pages/dashboard/file-manager'));
// APP
const ChatPage = lazy(() => import('src/pages/dashboard/chat'));
const MailPage = lazy(() => import('src/pages/dashboard/mail'));
const CalendarPage = lazy(() => import('src/pages/dashboard/calendar'));
const KanbanPage = lazy(() => import('src/pages/dashboard/kanban'));
// TEST RENDER PAGE BY ROLE
const PermissionDeniedPage = lazy(() => import('src/pages/dashboard/permission'));
// BLANK PAGE
const BlankPage = lazy(() => import('src/pages/dashboard/blank'));

// ----------------------------------------------------------------------

export const dashboardRoutes = [
  {
    path: 'dashboard',
    element: (
      <AuthGuard>
        <DashboardLayout>
          <Suspense fallback={<LoadingScreen />}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      </AuthGuard>
    ),
    children: [
      { element: <IndexPage />, index: true },
      {
        path: 'branchs',
        children: [
          { element: <Branchs />, index: true },
          { path: 'add-branchs', element: <AddBranchs /> },
          { path: ':id/edit', element: <EditBranchs /> },
          { path: ':id/translate', element: <TranslateBranch /> }
        ],
      },
      { path: 'settings', element: <Settings /> },
      { path: 'ecommerce', element: <OverviewEcommercePage /> },
      { path: 'analytics', element: <OverviewAnalyticsPage /> },
      { path: 'banking', element: <OverviewBankingPage /> },
      { path: 'booking', element: <OverviewBookingPage /> },
      { path: 'file', element: <OverviewFilePage /> },

      // ** Management
      {
        path: 'management',
        children: [
          { element: <BannerContent />, index: true },
          {
            path: 'banner',
            children: [
              { element: <BannerContent />, index: true },
              { path: 'add-banner', element: <AddBanner /> },
              { path: ':id/edit', element: <EditBanner /> }
            ],
          },
          {
            path: 'slider',
            children: [
              { element: <SliderPage />, index: true },
              { path: 'add-slider', element: <AddSlider /> },
              { path: ':id/edit', element: <EditSlider /> }
            ],
          },
          {
            path: 'popup',
            children: [
              { element: <PopupPage />, index: true },
              { path: 'add-popup', element: <AddPopup /> },
              { path: ':id/edit', element: <EditPopup /> }
            ],
          },
          {
            path: 'content-page',
            children: [
              { element: <ContentPages />, index: true },
              { path: 'add-content', element: <AddContentPages /> },
              { path: ':id/edit', element: <EditContentPages /> },
              { path: ':id/translate', element: <TranslateEditContentPages /> }
            ],
          },
          {
            path: 'homePage-offer',
            children: [
              { element: <HomePageOffer />, index: true },
              { path: 'add-offer', element: <AddHomePageOffer /> },
              { path: ':id/edit', element: <EditHomePageOffer /> },
            ],
          },
          {
            path: 'news',
            children: [
              { element: <NewsPages />, index: true },
              { path: 'add-news', element: <AddNews /> },
              { path: ':id/edit', element: <EditNews /> },
            ],
          },
          // { path: 'offer', element: <HomePageOffer /> },
          { path: 'next-program', element: <NextProgram /> },
        ],
      },
      // ** Members
      {
        path: 'members',
        children: [
          { element: <Elbuten />, index: true },

          { path: 'elbuten', element: <Elbuten /> },
        ],
      },
      {
        path: 'user',
        children: [
          { element: <UserProfilePage />, index: true },
          { path: 'profile', element: <UserProfilePage /> },
          { path: 'cards', element: <UserCardsPage /> },
          { path: 'list', element: <UserListPage /> },
          { path: 'new', element: <UserCreatePage /> },
          { path: ':id/edit', element: <UserEditPage /> },
          { path: 'account', element: <UserAccountPage /> },
        ],
      },
      {
        path: 'product',
        children: [
          { element: <ProductListPage />, index: true },
          { path: 'list', element: <ProductListPage /> },
          { path: ':id', element: <ProductDetailsPage /> },
          { path: 'new', element: <ProductCreatePage /> },
          { path: ':id/edit', element: <ProductEditPage /> },
        ],
      },
      {
        path: 'order',
        children: [
          { element: <OrderListPage />, index: true },
          { path: 'list', element: <OrderListPage /> },
          { path: ':id', element: <OrderDetailsPage /> },
        ],
      },
      {
        path: 'invoice',
        children: [
          { element: <InvoiceListPage />, index: true },
          { path: 'list', element: <InvoiceListPage /> },
          { path: ':id', element: <InvoiceDetailsPage /> },
          { path: ':id/edit', element: <InvoiceEditPage /> },
          { path: 'new', element: <InvoiceCreatePage /> },
        ],
      },
      {
        path: 'post',
        children: [
          { element: <BlogPostsPage />, index: true },
          { path: 'list', element: <BlogPostsPage /> },
          { path: ':title', element: <BlogPostPage /> },
          { path: ':title/edit', element: <BlogEditPostPage /> },
          { path: 'new', element: <BlogNewPostPage /> },
        ],
      },
      {
        path: 'job',
        children: [
          { element: <JobListPage />, index: true },
          { path: 'list', element: <JobListPage /> },
          { path: ':id', element: <JobDetailsPage /> },
          { path: 'new', element: <JobCreatePage /> },
          { path: ':id/edit', element: <JobEditPage /> },
        ],
      },
      {
        path: 'tour',
        children: [
          { element: <TourListPage />, index: true },
          { path: 'list', element: <TourListPage /> },
          { path: ':id', element: <TourDetailsPage /> },
          { path: 'new', element: <TourCreatePage /> },
          { path: ':id/edit', element: <TourEditPage /> },
        ],
      },
      { path: 'file-manager', element: <FileManagerPage /> },
      { path: 'mail', element: <MailPage /> },
      { path: 'chat', element: <ChatPage /> },
      { path: 'calendar', element: <CalendarPage /> },
      { path: 'kanban', element: <KanbanPage /> },
      { path: 'permission', element: <PermissionDeniedPage /> },
      { path: 'blank', element: <BlankPage /> },
    ],
  },
];
