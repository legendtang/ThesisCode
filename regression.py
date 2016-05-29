import pandas as pd

# read csv file directly from a URL and save the results
data = pd.read_csv('w_c_i_f.csv', index_col=0)
true_data = pd.read_csv('2016_1.csv', index_col=0)

# display the first 5 rows
print data.head()

# display the last 5 rows
print true_data.tail()

# create a python list of feature names
feature_cols = ['issues', 'forks']

# use the list to select a subset of the original DataFrame
X = data[feature_cols]
X_test = true_data[feature_cols]

# print the first 5 rows
X.head()

# check the type and shape of X
print type(X)
print X.shape

# select a Series from the DataFrame
y = data['watchers']
y_test = true_data['watchers']

# print the first 5 values
y.head()

print type(y)
print y.shape

# from sklearn.cross_validation import train_test_split
# X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.29, random_state=1)

# default split is 75% for training and 25% for testing
# print X_train.shape
# print y_train.shape
# print X_test.shape
# print y_test.shape

from sklearn.linear_model import LinearRegression

linreg = LinearRegression()

linreg.fit(X, y)

print linreg.intercept_
print linreg.coef_

# pair the feature names with the coefficients
zip(feature_cols, linreg.coef_)

y_pred = linreg.predict(X_test)

print y_test
print y_pred

from sklearn import metrics
import numpy as np

# calculate MAE using scikit-learn
print "MAE:",metrics.mean_absolute_error(y_test, y_pred)

# calculate MSE using scikit-learn
print "MSE:",metrics.mean_squared_error(y_test, y_pred)

# calculate RMSE using scikit-learn
print "RMSE:",np.sqrt(metrics.mean_squared_error(y_test, y_pred))
