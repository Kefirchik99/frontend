import React from 'react'; \nimport { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; \nimport ProductListPage from './pages/ProductListPage'; \nimport ProductDetailPage from './pages/ProductDetailPage'; \n\nconst AppRoutes = () => (\n < Router >\n < Routes >\n < Route path = '/' element = {< ProductListPage />} />\n      <Route path='/product /:id' element={<ProductDetailPage />} />\n    </Routes>\n  </Router>\n);\n\nexport default AppRoutes;
