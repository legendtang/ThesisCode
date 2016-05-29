print(__doc__)

import numpy as np
from sklearn.svm import SVR
import matplotlib.pyplot as plt

import pandas as pd

# read csv file directly from a URL and save the results
data = pd.read_csv('w_c_i_f.csv', index_col=0)
true_data = pd.read_csv('2016_1.csv', index_col=0)

# create a python list of feature names
feature_cols = ['forks']

# use the list to select a subset of the original DataFrame
X = data[feature_cols]
X_test = true_data[feature_cols]

# select a Series from the DataFrame
y = data['watchers']
y_test = true_data['watchers']

# ###############################################################################
# # Generate sample data
# X = np.sort(5 * np.random.rand(40, 1), axis=0)
# y = np.sin(X).ravel()
#
# ###############################################################################
# # Add noise to targets
# y[::5] += 3 * (0.5 - np.random.rand(8))
#
print X_test
print y_test

###############################################################################
# Fit regression model
svr_rbf = SVR(kernel='rbf', C=1e4, cache_size=7000)
print 1
svr_lin = SVR(kernel='linear', C=1e3, cache_size=7000)
print 2
svr_poly = SVR(kernel='poly', C=1e2, degree=2, cache_size=7000)
print 3
y_rbf = svr_rbf.fit(X, y).predict(X)
print y_rbf
# y_lin = svr_lin.fit(X, y).predict(X_test)
# print y_lin
# y_poly = svr_poly.fit(X, y).predict(X_test)
# print y_poly

from sklearn import metrics
import numpy as np

# # calculate MAE using scikit-learn
# print "MAE:",metrics.mean_absolute_error(y_test, y_lin)
#
# # calculate MSE using scikit-learn
# print "MSE:",metrics.mean_squared_error(y_test, y_lin)
#
# # calculate RMSE using scikit-learn
# print "RMSE:",np.sqrt(metrics.mean_squared_error(y_test, y_lin))

# ###############################################################################
# look at the results
plt.scatter(X, y, c='k', label='data')
plt.hold('on')
plt.plot(X, y_rbf, c='g', label='RBF model')
# plt.plot(X_test, y_lin, c='r', label='Linear model')
# plt.plot(X_test, y_poly, c='b', label='Polynomial model')
plt.xlabel('data')
plt.ylabel('target')
plt.title('Support Vector Regression')
plt.legend()
plt.show()
