import pandas as pd
import seaborn as sns

# read csv file directly from a URL and save the results
data = pd.read_csv('w_c_i_f.csv', index_col=0)

# display the first 5 rows
print data.head()

# display the last 5 rows
print data.tail()

# %matplotlib inline

sns.set(style="ticks", color_codes=True)

sns.pairplot(data, x_vars=['commits', 'issues', 'forks'], y_vars=['watchers'], size=7, aspect=0.8, kind='reg')

sns.plt.show()
